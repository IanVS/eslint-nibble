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

/**
 * Get only the results wanted from a report
 * @param  {object} report   The report to filter
 * @param  {string} msgKey   Name of the message property on which to filter
 * @param  {object} options  Options to use for comparison
 * @return {object}          Report object which only contains messages that pass filter
 */
function filterResults(report, msgKey, options) {
  let newResults = {};
  let totalErrors = 0;
  let totalWarnings = 0;
  newResults.results = report.results.map(function (result) {
    let filteredMessages = result.messages.filter(function (msg) {
      if (options.present) {
        return (msg[msgKey]);
      }
      if (options.compareVal) {
        return (msg[msgKey] === options.compareVal);
      }
    });
    if (filteredMessages) {
      let { errorCount, warningCount } = getCounts(filteredMessages);
      totalErrors += errorCount;
      totalWarnings += warningCount;
      return {
        filePath    : result.filePath,
        messages    : filteredMessages,
        errorCount,
        warningCount
      };
    }
  });
  newResults.errorCount = totalErrors;
  newResults.warningCount = totalWarnings;
  return newResults;
}

module.exports = {

  nibbleOnFiles(files) {
    let report = cli.executeOnFiles(files);
    return report;
  },

  getFatalResults(report) {
    let fatalResults = filterResults(report, 'fatal', { present: true });
    if (fatalResults.errorCount > 0) {
      return fatalResults;
    }
  },

  getFormattedResults(report, fmt) {
    let formatter = cli.getFormatter(fmt);
    return formatter(report.results);

  },

  getRuleResults(report, ruleName) {
    let ruleResults = filterResults(report, 'ruleId', { compareVal: ruleName });
    return ruleResults;
  }
};
