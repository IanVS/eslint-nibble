import { CLIEngine } from 'eslint';
import chalk from 'chalk';
import inquirer from 'inquirer';
import * as fmt from './config/formatters';

var formatter;

let cli = new CLIEngine({});
let args = (process.argv.slice(2).length > 0) ? process.argv.slice(2) : ['.'];
let report = cli.executeOnFiles(args);

if (report && (report.errorCount > 0 || report.warningCount > 0)) {
  // todo: break this into seperate module
  // If something is totally broken, should be able to tell from first message
  let firstMsg = report.results[0].messages[0];
  if (firstMsg && firstMsg.fatal) {
    console.log(chalk.red(firstMsg.message));
  } else {
    // Display stats by rule
    formatter = cli.getFormatter(fmt.stats);
    console.log(formatter(report.results));
    // Display summary
    formatter = cli.getFormatter(fmt.summary);
    console.log(formatter(report.results));

    inquirer.prompt([{
      name: 'rule',
      type: 'input',
      message: 'Type in the rule you want to focus on'
    }], function gotInput(answers) {
      // todo: create another module here
      let filteredResults = report.results.map(function (result) {
        let filteredMessages = result.messages.filter(function (msg) {
          return (msg.ruleId === answers.rule);
        });
        if (filteredMessages) {
          return {
            filePath: result.filePath,
            messages: filteredMessages,
            errorCount: filteredMessages.length,
            warningCount: result.warningCount
          }
        };
      });
      // Display detailed error reports
      formatter = cli.getFormatter(fmt.detailed);
      console.log(formatter(filteredResults));
    });
  }
} else {
  console.log(chalk.green('Great job, all lint rules passed.'));
}

