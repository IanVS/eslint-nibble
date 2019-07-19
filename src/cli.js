'use strict';

import nibbler from './nibbler';
import * as fmt from './config/formatters';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { fix } from 'eslint-filtered-fix';
import options from './config/options';
import { version } from '../package.json';
import prependFile from 'prepend-file';

let cli = {

  execute: function (args) {
    let currentOptions,
        files,
        extensions,
        config,
        cache,
        cacheLocation,
        allowedRules,
        warnings;

    // Parse options
    try {
      currentOptions = options.parse(args);
      files = currentOptions._;
      extensions = currentOptions.ext;
      config = currentOptions.config;
      cache = currentOptions.cache;
      cacheLocation = currentOptions.cacheLocation;
      allowedRules = currentOptions.rule;
      warnings = currentOptions.warnings;
    } catch (error) {
      console.error(error.message);
      return 1;
    }

    // Decide what to do based on options
    if (currentOptions.version) {
      // Show version from package.json
      console.log('v' + version);
    } else if (currentOptions.help || (!files.length)) {
      // Show help
      console.log(options.generateHelp());
    } else {
      const configuration = { extensions };
      if (config) {
        configuration.configFile = config;
      }
      if (cache) {
        configuration.cache = cache;
      }
      if (cacheLocation) {
        configuration.cacheLocation = cacheLocation;
      }

      nibbler.configure(configuration);
      let report = nibbler.nibbleOnFiles(files);
      if (report && (report.errorCount > 0 || report.warningCount > 0)) {
        // Check if there was a fatal error
        let fatalReport = nibbler.getFatalResults(report);
        if (fatalReport) {
          let errors = nibbler.getFormattedResults(fatalReport, 'stylish');
          console.log(errors);
          console.error('Fatal error(s) were detected.  Please correct and try again.');
          return 1;
        }

        if (report && !warnings) {
          report = nibbler.getSeverityResults(report, 2);
        }

        // Calculate stats array
        let stats = nibbler.getFormattedResults(report, fmt.stats)
          .split('\n');

        // Create an array of choices from the stats
        // (filter removes empty stat at end)
        const results = stats
          .filter(stat => stat)
          .map(stat => {
            const ruleName = stat.split(':')[0];

            return {
              name : stat,
              value: ruleName,
              short: ruleName
            };
          })
          // Only include allowed rules, if given
          .filter(stat => allowedRules ? allowedRules.includes(stat.value) : true);

        if (!results.length) {
          // If all stats were filtered out due to provided `--rule` options…
          if (allowedRules && allowedRules.length) {
            console.log(chalk.yellow(`\nNo lint failures found for rule(s): ${allowedRules.join(', ')}`));
            console.log('Try running again without "--rule"');
            return 0;
          }
          // Or maybe they were filtered out because they were all warnings,
          // and the user didn't want to check warnings
          if (!warnings) {
            console.log(chalk.green('Great job, no lint rules reporting errors.'));
            return 0;
          }
        }

        // Show summary
        let summary = nibbler.getFormattedResults(report, fmt.summary);
        console.log(summary);

        // Ask user for the rule to narrow in on
        inquirer.prompt([{
          name    : 'rule',
          type    : 'list',
          message : 'Which rule would you like to fix?',
          choices : results,
          pageSize: results.length
        },
        {
          name   : 'fix',
          type   : 'confirm',
          message: 'Would you like to attempt to auto-fix?',
          default: false,
          when(answers) {
            let ruleReport = nibbler.getRuleResults(report, answers.rule);
            return ruleReport.fixableErrorCount > 0 || ruleReport.fixableWarningCount > 0;
          }
        },
        {
          name   : 'fixWarnings',
          type   : 'confirm',
          message: 'Autofix warnings?',
          default: true,
          when(answers) {
            if (!answers.fix) return false;

            let ruleReport = nibbler.getRuleResults(report, answers.rule);
            return ruleReport.fixableWarningCount > 0;
          }
        },
        {
          name   : 'disableFiles',
          type   : 'confirm',
          message: 'Disable rule for files?',
          default: false
        }])
          .then(function gotInput(answers) {
            // Display detailed error reports
            let ruleName = answers.rule;

            if (answers.fix) {
              const fixOptions = {
                rules   : [ruleName],
                warnings: answers.fixWarnings
              };
              const fixedReport = fix(files, fixOptions, configuration);
              let ruleResults = nibbler.getRuleResults(fixedReport, ruleName);
              if (ruleResults.errorCount > 0 || ruleResults.warningCount > 0) {
                let detailed = nibbler.getFormattedResults(ruleResults, fmt.detailed);
                console.log(detailed);
              } else {
                console.log(chalk.green(`Fixes applied, ${ruleName} is now passing`));
              }
            } else if (answers.disableFiles) {
              const files = report.results.map(result => result.filePath);

              files.forEach((filePath) => {
                console.log(`Disabling ${ruleName} for ${filePath}`);
                prependFile.sync(filePath, `/* eslint-disable ${ruleName} */\n`);
              });
            } else {
              let ruleResults = nibbler.getRuleResults(report, ruleName);
              let detailed = nibbler.getFormattedResults(ruleResults, fmt.detailed);
              console.log(detailed);
            }
          });

      // No report or not any errors or warnings
      } else {
        console.log(chalk.green('Great job, all lint rules passed.'));
        return 0;
      }
    }
    return 0;
  }
};

module.exports = cli;
