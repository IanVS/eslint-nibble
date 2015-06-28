import { CLIEngine } from 'eslint';
import chalk from 'chalk';
import inquirer from 'inquirer';

let byError = __dirname + '/../node_modules/eslint-stats/byError.js';
let friendly = __dirname + '/../node_modules/eslint-friendly-formatter/index.js';

let cli = new CLIEngine({});

let args = (process.argv.slice(2).length > 0) ? process.argv.slice(2) : ['.'];
let report = cli.executeOnFiles(args);
let formatter = cli.getFormatter(byError);
if (report && report.errorCount > 0) {
  // todo: break this into seperate module
  // If something is totally broken, should be able to tell from first message
  let firstMsg = report.results[0].messages[0];
  if (firstMsg && firstMsg.fatal) {
    console.log(chalk.red(firstMsg.message));
  } else {
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
      formatter = cli.getFormatter(friendly);
      console.log(formatter(filteredResults));
    });
  }
} else {
  console.log(chalk.green('Great job, all lint rules passed.'));
}

