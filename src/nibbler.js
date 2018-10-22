'use strict';

import resolve from 'resolve';

const { CLIEngine } = require(resolve.sync('eslint', { basedir: process.cwd() }));
let cli = new CLIEngine({});

console.log('process.cwd:', process.cwd());
console.log('__basedir', __dirname);
console.log('resolve.sync dirname', resolve.sync('eslint', { basedir: __dirname }));

function getCounts(messages) {
  let counts = messages.reduce(function (result, message) {
    if (message.severity === 1) {
      result.warningCount++;
      if (message.fix) {
        result.fixableWarningCount++;
      }
    }
    if (message.severity === 2) {
      result.errorCount++;
      if (message.fix) {
        result.fixableErrorCount++;
      }
    }
    return result;
  }, { errorCount: 0, warningCount: 0, fixableErrorCount: 0, fixableWarningCount: 0 });

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
  let totalFixableErrors = 0;
  let totalFixableWarnings = 0;
  newResults.results = report.results.map(function (result) {
    let filteredMessages = result.messages.filter(function (msg) {
      if (options.present) {
        return (msg[msgKey]);
      }
      if (options.compareVal) {
        return (msg[msgKey] === options.compareVal);
      }
      return false;
    });
    if (filteredMessages) {
      let { errorCount, warningCount, fixableErrorCount, fixableWarningCount } = getCounts(filteredMessages);
      totalErrors += errorCount;
      totalWarnings += warningCount;
      totalFixableErrors += fixableErrorCount;
      totalFixableWarnings += fixableWarningCount;
      // fixableErrors += fixableErrors;
      return {
        filePath: result.filePath,
        messages: filteredMessages,

        errorCount,
        warningCount,
        fixableErrorCount,
        fixableWarningCount
      };
    }
    return {};
  });
  newResults.errorCount = totalErrors;
  newResults.warningCount = totalWarnings;
  newResults.fixableErrorCount = totalFixableErrors;
  newResults.fixableWarningCount = totalFixableWarnings;
  return newResults;
}

module.exports = {

  configure(configuration) {
    cli = new CLIEngine(configuration);
  },

  nibbleOnFiles(files) {
    let report = cli.executeOnFiles(files);
    return report;
  },

  getFatalResults(report) {
    let fatalResults = filterResults(report, 'fatal', { present: true });
    if (fatalResults.errorCount > 0) {
      return fatalResults;
    }
    return undefined;
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
