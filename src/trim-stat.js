
/**
 * Trim out whitespace from a stat while preserving ansi escape codes
 *
 * @param  {string} stat   The stat to trim
 * @param  {number} maxLen The maximum allowable length of the stat
 * @return {string}        The trimmed stat
 */
function trimStat(stat, maxLen) {
  if (stat.length <= maxLen) return stat;

  const diffFromMax = stat.length - maxLen;
  const ansiEscape = stat.slice(stat.length - 10);
  return stat.slice(0, stat.length - diffFromMax - 10) + ansiEscape;
}

module.exports = trimStat;
