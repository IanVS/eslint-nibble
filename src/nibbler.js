'use strict';

const { ESLint } = require('eslint');
const { fix } = require('eslint-filtered-fix');
let cli = new ESLint({});

function getCounts(messages) {
  const counts = messages.reduce(function (result, message) {
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

// Extracted from Eslint https://github.com/eslint/eslint/blob/ba58d94cb51d4d2644c024446d5750eaf4853129/lib/cli-engine/cli-engine.js#L181-L202
/**
 * It will calculate the error and warning count for collection of results from all files
 * @param  {array}  results  Collection of messages from all the files
 * @return {object}          Contains the stats
 */
function calculateStatsPerRun(results) {
  return results.reduce((stat, result) => {
    stat.errorCount += result.errorCount;
    stat.fatalErrorCount += result.fatalErrorCount;
    stat.warningCount += result.warningCount;
    stat.fixableErrorCount += result.fixableErrorCount;
    stat.fixableWarningCount += result.fixableWarningCount;
    return stat;
  }, {
    errorCount         : 0,
    fatalErrorCount    : 0,
    warningCount       : 0,
    fixableErrorCount  : 0,
    fixableWarningCount: 0
  });
}

/**
 * Get only the results wanted from a report
 * @param  {object} report   The report to filter
 * @param  {string} msgKey   Name of the message property on which to filter
 * @param  {object} options  Options to use for comparison
 * @return {object}          Report object which only contains messages that pass filter
 */
function filterResults(report, msgKey, options) {
  const newResults = {};
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalFixableErrors = 0;
  let totalFixableWarnings = 0;
  newResults.results = report.results.map(function (result) {
    const filteredMessages = result.messages.filter(function (msg) {
      if (msgKey === 'fix' && msg.fix) {
        return true;
      }

      if (options.present) {
        return (msg[msgKey]);
      }
      if (options.compareVal) {
        return (msg[msgKey] === options.compareVal);
      }
      if (options.includes) {
        if (!Array.isArray(options.includes)) {
          throw new Error('filterResults: `options.includes` must be an array');
        }
        return options.includes.includes(msg[msgKey]);
      }
      return false;
    });
    if (filteredMessages) {
      const { errorCount, warningCount, fixableErrorCount, fixableWarningCount } = getCounts(filteredMessages);
      totalErrors += errorCount;
      totalWarnings += warningCount;
      totalFixableErrors += fixableErrorCount;
      totalFixableWarnings += fixableWarningCount;
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
    cli = new ESLint(configuration);
  },

  async nibbleOnFiles(files) {
    const results = await cli.lintFiles(files);
    const report = {
      results,
      ...calculateStatsPerRun(results)
    };
    return report;
  },

  async fixNibbles(files, fixOptions, configuration) {
    const results = await fix(files, fixOptions, configuration);
    const report = {
      results,
      ...calculateStatsPerRun(results)
    };
    return report;
  },

  getFatalResults(report) {
    const fatalResults = filterResults(report, 'fatal', { present: true });
    if (fatalResults.errorCount > 0) {
      return fatalResults;
    }
    return undefined;
  },

  async getFormattedResults(report, fmt) {
    const formatter = await cli.loadFormatter(fmt);
    return formatter.format(report.results);
  },

  getRuleResults(report, ruleName) {
    const ruleResults = Array.isArray(ruleName)
      ? filterResults(report, 'ruleId', { includes: ruleName })
      : filterResults(report, 'ruleId', { compareVal: ruleName });
    return ruleResults;
  },

  getSeverityResults(report, severity) {
    const ruleResults = filterResults(report, 'severity', { compareVal: severity });
    return ruleResults;
  },

  getFixableResults(report) {
    const ruleResults = filterResults(report, 'fix', {});
    return ruleResults;
  }
};
