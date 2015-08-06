'use strict';

import { CLIEngine } from 'eslint';
let cli = new CLIEngine({});

function getCounts(messages) {
  let counts = messages.reduce(function (result, message) {
    if (message.severity === 1) {
      result.warningCount++;
    }
    if (message.severity === 2) {
      result.errorCount++;
    }
    return result;
  }, { errorCount: 0, warningCount: 0 });

  return counts;
}

module.exports = {

  nibbleOnFiles(files) {
    let report = cli.executeOnFiles(files);
    return report;
  },

  getFatal(report) {
    // If something is totally broken, should be able to tell from first message
    let firstMsg = report.results[0].messages[0];
    if (firstMsg && firstMsg.fatal) {
      return firstMsg.message;
    }
  },

  getFormattedResults(report, formatterPath) {
    let formatter = cli.getFormatter(formatterPath);
    return formatter(report.results);

  },

  getRuleResults(report, ruleName) {
    let ruleResults = {};
    let totalErrors = 0;
    let totalWarnings = 0;

    ruleResults.results = report.results.map(function (result) {
      let ruleMessages = result.messages.filter(function (msg) {
        return (msg.ruleId === ruleName);
      });
      if (ruleMessages) {
        let { errorCount, warningCount } = getCounts(ruleMessages);
        totalErrors += errorCount;
        totalWarnings += warningCount;
        return {
          filePath    : result.filePath,
          messages    : ruleMessages,
          errorCount,
          warningCount
        };
      }
    });
    ruleResults.errorCount = totalErrors;
    ruleResults.warningCount = totalWarnings;

    return ruleResults;
  }
};
