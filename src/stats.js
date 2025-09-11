const statsFormatter = require('@ianvs/eslint-stats/byErrorAndWarning.js');

module.exports = function (results) {
  const stats = statsFormatter(results);
  // Create an array of inquirer-friendly choices from the stats
  return stats
    .split('\n')
    .filter((stat) => stat) // (filter removes empty stat at end)
    .map((stat) => {
      const ruleName = stat.split(':')[0];

      return {
        name: stat,
        value: ruleName,
        short: ruleName,
      };
    });
};
