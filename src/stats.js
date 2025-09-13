'use strict';
const color = require('yoctocolors');

const { bgColors, severities } = require('./config/constants.js');

const getBarRatio = (usedColumns, maxResult, maxWidth) => {
  const maxBarLength = maxWidth - usedColumns;
  return maxResult <= maxBarLength ? 1 : maxBarLength / maxResult;
};

function formatRow(ruleText, severity, infractionCount, maxRuleCharacters, maxRuleInfractionCount) {
  const maxRuleCountCharacters = String(maxRuleInfractionCount).length;
  const paddedRule = `${ruleText}:`.padEnd(maxRuleCharacters + 2);
  const paddedCount = color.magenta(String(infractionCount).padStart(maxRuleCountCharacters));
  const maxScreen = process.stdout.columns - 3;
  const barRatio = getBarRatio(maxRuleCharacters + maxRuleCountCharacters + 3, maxRuleInfractionCount, maxScreen);
  const barLength = infractionCount * barRatio;
  const bar = color[bgColors[severity]](' '.repeat(barLength));
  return `${paddedRule}${paddedCount}|${bar}`;
}

module.exports = function (results) {
  let maxRuleCharacters = 0;
  let maxRuleInfractions = 0;
  const countInfractions = results
    .flatMap((file) => file.messages)
    .reduce((acc, message) => {
      const ruleId = String(message.ruleId);
      maxRuleCharacters = Math.max(ruleId.length, maxRuleCharacters);

      const severityName = severities[message.severity];

      acc[ruleId] = {
        ...acc[ruleId],
      };
      acc[ruleId][severityName] = (acc[ruleId][severityName] || 0) + 1;
      maxRuleInfractions = Math.max(acc[ruleId][severityName], maxRuleInfractions);
      return acc;
    }, {});

  const severityList = Object.values(severities);
  const rulesList = Object.keys(countInfractions).sort();
  return rulesList
    .flatMap((ruleName) => {
      return severityList.map((severity) => {
        if (countInfractions[ruleName][severity]) {
          return {
            name: formatRow(
              ruleName,
              severity,
              countInfractions[ruleName][severity],
              maxRuleCharacters,
              maxRuleInfractions
            ),
            value: ruleName,
            short: ruleName,
          };
        }
      });
    })
    .filter(Boolean);
};
