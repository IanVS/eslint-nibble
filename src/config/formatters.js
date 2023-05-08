/*
These will be used as custom formatters.
 */

const stats = require.resolve('@ianvs/eslint-stats/byErrorAndWarning.js');
const summary = require.resolve('../summary.js');
const detailed = require.resolve('eslint-formatter-friendly');

module.exports = {
  stats,
  summary,
  detailed
};
