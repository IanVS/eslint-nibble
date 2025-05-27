'use strict';

const nibbler = require('./nibbler');
const fmt = require('./config/formatters');
const chalk = require('chalk');
const inquirer = require('@inquirer/prompts');
const options = require('./config/options');
const { version } = require('../package.json');

const cli = {
  async execute(args) {
    let currentOptions,
      files,
      extensions,
      configFile,
      resolvePluginsRelativeTo,
      cache,
      cacheLocation,
      allowedRules,
      rulesDir,
      includeWarnings,
      isInteractive,
      isMulti,
      format,
      fixableOnly;

    // Parse options
    try {
      currentOptions = options.parse(args);
      files = currentOptions._;
      extensions = currentOptions.ext;
      configFile = currentOptions.config;
      resolvePluginsRelativeTo = currentOptions.resolvePluginsRelativeTo;
      cache = currentOptions.cache;
      cacheLocation = currentOptions.cacheLocation;
      allowedRules = currentOptions.rule;
      rulesDir = currentOptions.rulesdir;
      includeWarnings = currentOptions.warnings;
      isInteractive = currentOptions.interactive;
      isMulti = currentOptions.multi;
      format = currentOptions.format;
      fixableOnly = currentOptions.fixableOnly;
    } catch (error) {
      console.error(error.message);
      return 1;
    }

    // Decide what to do based on options
    if (currentOptions.version) {
      // Show version from package.json
      console.log('v' + version);
    } else if (currentOptions.help || !files.length) {
      // Show help
      console.log(options.generateHelp());
    } else {
      const configuration = {};
      if (extensions) {
        configuration.extensions = extensions;
      }
      if (configFile) {
        configuration.overrideConfigFile = configFile;
      }
      if (resolvePluginsRelativeTo) {
        configuration.resolvePluginsRelativeTo = resolvePluginsRelativeTo;
      }
      if (cache) {
        configuration.cache = cache;
      }
      if (cacheLocation) {
        configuration.cacheLocation = cacheLocation;
      }
      if (rulesDir) {
        configuration.rulePaths = rulesDir;
      }

      nibbler.configure(configuration);
      let report = await nibbler.nibbleOnFiles(files);
      if (report && (report.errorCount > 0 || report.warningCount > 0)) {
        // Check if there was a fatal error
        const fatalReport = nibbler.getFatalResults(report);
        if (fatalReport) {
          const errors = await nibbler.getFormattedResults(fatalReport, 'stylish');
          console.log(errors);
          console.error('Fatal error(s) were detected.  Please correct and try again.');
          return 2;
        }

        if (report && !includeWarnings) {
          report = nibbler.getSeverityResults(report, 2);
        }

        if (report && fixableOnly) {
          report = nibbler.getFixableResults(report);
        }

        // Calculate stats array
        const stats = await nibbler.getFormattedResults(report, fmt.stats);

        // Create an array of choices from the stats
        // (filter removes empty stat at end)
        const results = stats
          .split('\n')
          .filter((stat) => stat)
          .map((stat) => {
            const ruleName = stat.split(':')[0];

            return {
              name: stat,
              value: ruleName,
              short: ruleName,
            };
          })
          // Only include allowed rules, if given
          .filter((stat) => (allowedRules ? allowedRules.includes(stat.value) : true));

        if (!results.length) {
          // If all stats were filtered out due to provided `--rule` options…
          if (allowedRules && allowedRules.length) {
            console.log(chalk.yellow(`\nNo lint failures found for rule(s): ${allowedRules.join(', ')}`));
            console.log('Try running again without "--rule"');
            return 0;
          }
          // Or maybe they were filtered out because they were all warnings,
          // and the user didn't want to check warnings
          if (!includeWarnings) {
            console.log(chalk.green('Great job, no lint rules reporting errors.'));
            return 0;
          }
          // Or if all stats were filtered out due to a provided `--fixable` flag
          if (fixableOnly) {
            console.log(chalk.yellow('\nNo fixable lint failures found.'));
            console.log('Try running again without "--fixable-only"');
            return 0;
          }
        }

        if (!isInteractive) {
          const finalReport = allowedRules ? nibbler.getRuleResults(report, allowedRules) : report;
          // Just give an exit code based on having any errors, no interactive menu
          const output = await nibbler.getFormattedResults(finalReport, format);
          console.log(output);

          return report.errorCount > 0 ? 1 : 0;
        }

        // Show summary
        const summary = await nibbler.getFormattedResults(report, fmt.summary);
        console.log(summary);

        // Ask user for the rule to narrow in on
        const ruleAnswer =
          isMulti ?
            await inquirer.checkbox({
              message: 'Which rule(s) would you like to view?',
              choices: results,
              pageSize: results.length,
            })
          : await inquirer.select({
              message: 'Which rule would you like to view?',
              choices: results,
              pageSize: results.length,
            });

        const ruleReport = nibbler.getRuleResults(report, ruleAnswer);
        const hasFixableLints = ruleReport.fixableErrorCount > 0 || ruleReport.fixableWarningCount > 0;
        const fixAnswer =
          hasFixableLints ?
            await inquirer.confirm({
              message: 'Would you like to attempt to auto-fix?',
              default: false,
            })
          : false;

        const hasFixableWarnings = nibbler.getRuleResults(report, ruleAnswer).fixableWarningCount > 0;
        const fixWarningsAnswer =
          hasFixableWarnings && fixAnswer ?
            await inquirer.confirm({
              message: 'Autofix warnings?',
              default: true,
            })
          : false;

        // Display detailed error reports
        if (fixAnswer) {
          const fixOptions = {
            rules: isMulti ? ruleAnswer : [ruleAnswer],
            warnings: fixWarningsAnswer,
          };
          const fixedReport = await nibbler.fixNibbles(files, fixOptions, configuration);
          const ruleResults = nibbler.getRuleResults(fixedReport, ruleAnswer);
          if (ruleResults.errorCount > 0 || ruleResults.warningCount > 0) {
            const detailed = await nibbler.getFormattedResults(ruleResults, fmt.detailed);
            console.log(detailed);
          } else {
            if (isMulti) {
              console.log(chalk.green(`Fixes applied: ${ruleAnswer.join(', ')} now passing`));
            } else {
              console.log(chalk.green(`Fixes applied, ${ruleAnswer} is now passing`));
            }
          }
        } else {
          const ruleResults = nibbler.getRuleResults(report, ruleAnswer);
          const detailed = await nibbler.getFormattedResults(ruleResults, fmt.detailed);
          console.log(detailed);
        }

        // No report or not any errors or warnings
      } else {
        console.log(chalk.green('Great job, all lint rules passed.'));
        return 0;
      }
    }
    return 0;
  },
};

module.exports = cli;
