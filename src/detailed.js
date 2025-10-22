'use strict';

const { codeFrameColumns } = require('@babel/code-frame');
const colors = require('yoctocolors');
const table = require('text-table');
const fs = require('node:fs');
const path = require('node:path');

const { colors: severityColors, icons, severities } = require('./config/constants.js');

function formatFilesSummary(results) {
  const header = ['Errors', 'Warnings', 'Files'];

  const rows = results
    .map((file) => {
      if (file.messages.length === 0) {
        return;
      }
      let minLineCount = Infinity;
      const counts = file.messages.reduce(
        (acc, message) => {
          minLineCount = Math.min(minLineCount, message.line);
          acc[severities[message.severity]]++;
          return acc;
        },
        {
          error: 0,
          warning: 0,
        }
      );
      return [counts.error, counts.warning, path.relative('.', file.filePath) + ':' + colors.gray(minLineCount)];
    })
    .filter(Boolean);

  return table([header, ...rows], { align: ['r', 'r', 'l'] });
}

function formatErrorText(count, title) {
  return `${count} ${title}${count !== 1 ? 's' : ''}`;
}

function formatErrorsSummary(totalErrors, totalWarnings) {
  const totalProblems = totalErrors + totalWarnings;
  const maxSeverity = totalErrors > 0 ? 'error' : 'warning';

  let output = '\n';
  output += colors[severityColors[maxSeverity]](
    `${icons[maxSeverity]} ${formatErrorText(totalProblems, 'problem')} (${formatErrorText(totalErrors, 'error')}, ${formatErrorText(totalWarnings, 'warning')})`
  );
  output += '\n\n';
  return output;
}

function formatSourceCodeWithBabel(message) {
  const { source, line, column, endLine, endColumn } = message;

  const location = {
    start: { line, column },
    end: { line: endLine, column: endColumn },
  };

  return codeFrameColumns(source, location, {
    highlightCode: true,
    linesAbove: 2,
    linesBelow: 2,
  });
}

function detailed(results, context) {
  if (!results || results.length === 0) {
    return '';
  }
  if (!results.some((result) => result.messages && result.messages.length > 0)) {
    return '';
  }
  let totalErrors = 0;
  let totalWarnings = 0;

  let output = '\n';

  const groupedResults = results.reduce((acc, result) => {
    if (!result.messages || result.messages.length === 0) {
      return acc;
    }
    result.messages.forEach((message) => {
      // Count errors and warnings
      if (message.severity === 2) {
        totalErrors++;
      } else if (message.severity === 1) {
        totalWarnings++;
      }
      const ruleId = String(message.ruleId);
      if (!acc[ruleId]) {
        acc[ruleId] = [];
      }
      const updatedMessage = {
        ...message,
        ruleUrl: context?.rulesMeta?.[ruleId]?.docs?.url,
        // Messages do not have references to the files they came from, as that's defined in their parent, but now we're grouping them differently.
        filePath: path.relative('.', result.filePath),
        // Messages are not guaranteed to have their source defined.
        source: message.source || fs.readFileSync(result.filePath, 'utf8'),
      };
      acc[ruleId].push(updatedMessage);
    });
    return acc;
  }, {});

  const sortedResults = Object.entries(groupedResults).flatMap(([, messages]) => {
    return messages.sort((a, b) => {
      const pathSort = a.filePath.localeCompare(b.filePath);
      if (pathSort) {
        return pathSort;
      }
      const lineSort = a.line - b.line;
      if (lineSort) {
        return lineSort;
      }
      const columnSort = a.column - b.column;
      if (columnSort) {
        return columnSort;
      }
      return 0;
    });
  });

  sortedResults.forEach((result) => {
    output += formatMessage(result);
  });

  // Add summary
  if (totalErrors > 0 || totalWarnings > 0) {
    output += formatErrorsSummary(totalErrors, totalWarnings);
  }

  output += formatFilesSummary(results);
  output += '\n';

  return output;
}

function formatMessage(message) {
  const { filePath, severity, ruleId, ruleUrl } = message;

  let output = `
${colors.cyanBright(filePath)}:${colors.yellowBright(message.line)}:${colors.yellowBright(message.column)} - ${colors[severityColors[severities[severity]]](severities[severity])} ${colors.dim(`${ruleId} ${ruleUrl}`)}
${message.message}

`;

  // Display source code if available
  if (message.source) {
    output += formatSourceCodeWithBabel(message);
    output += '\n\n';
  }

  return output;
}

module.exports = detailed;
