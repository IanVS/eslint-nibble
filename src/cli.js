'use strict';

import nibbler from './nibbler';
import * as fmt from './config/formatters';
import chalk from 'chalk';
import inquirer from 'inquirer';
import options from './config/options';
import { version } from '../package.json';

let cli = {

  execute: function (args) {
    let currentOptions,
    files;

    // Parse options
    try {
      currentOptions = options.parse(args);
      files = currentOptions._;
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
      let report = nibbler.nibbleOnFiles(files);
      if (report && (report.errorCount > 0 || report.warningCount > 0)) {

        // Check if there was a fatal error
        let fatalMsg = nibbler.getFatal(report);
        if (fatalMsg) {
          console.error(fatalMsg);
          return 1;
        }
        // Show stats
        let stats = nibbler.getFormattedResults(report, fmt.stats);
        console.log(stats);

        // Show summary
        let summary = nibbler.getFormattedResults(report, fmt.summary);
        console.log(summary);

        // Ask user for rule to narrow in on
        inquirer.prompt([{
          name   : 'rule',
          type   : 'input',
          message: 'Type in the rule you want to focus on'
        }], function gotInput(answers) {

          // Display detailed error reports
          let ruleName = answers.rule;
          let ruleResults = nibbler.getRuleResults(report, ruleName);
          let detailed = nibbler.getFormattedResults(ruleResults, fmt.detailed);
          console.log(detailed);
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
