'use strict';

import nibbler from './nibbler';
import * as fmt from './config/formatters';
import chalk from 'chalk';
import inquirer from 'inquirer';
import {fix} from 'eslint-filtered-fix';
import trimStat from './trim-stat';
import options from './config/options';
import { version } from '../package.json';

let cli = {

  execute: function (args) {
    let currentOptions,
        files,
        extensions,
        config,
        cache,
        cacheLocation;

    // Parse options
    try {
      currentOptions = options.parse(args);
      files = currentOptions._;
      extensions = currentOptions.ext;
      config = currentOptions.config;
      cache = currentOptions.cache;
      cacheLocation = currentOptions.cacheLocation;
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

        // Show summary
        let summary = nibbler.getFormattedResults(report, fmt.summary);
        console.log(summary);

        // Calculate stats array
        let stats = nibbler.getFormattedResults(report, fmt.stats)
          .split('\n');

        // Determine the length of the longest stat
        const maxStatLen = stats.reduce((maxLen, stat) => {
          return Math.max(maxLen, stat.length);
        }, 0);
        // Inquirer adds three characters, so we will need to trim them later
        const maxAllowedLen = maxStatLen - 3;

        // Create an array of choices from the stats
        // (filter removes empty stat at end)
        const results = stats.filter(stat => stat).map(stat => {
          const ruleName = stat.split(':')[0];
          // If the stat length is within 3 of max, we need to truncate it
          // so that the line does not wrap once inquirer adds a select arrow
          // (This throws off the relative length slightly, but not much)
          const fullStat = stat.length <= maxAllowedLen
            // Short enough to return as-is
            ? stat
            // Need to remove spaces, while accounting for 10 char ansi escape for color
            : trimStat(stat, maxAllowedLen);

          return {
            name : fullStat,
            value: ruleName,
            short: ruleName
          };
        });

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
