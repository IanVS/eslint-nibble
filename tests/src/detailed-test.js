'use strict';

const test = require('tape');
const detailed = require('../../src/detailed.js');

const meta = require('../fixtures/reports/meta.js');
const noIssues = require('../fixtures/reports/no-issues.js');
const oneFileOneErrorOneFixableError = require('../fixtures/reports/one-file-one-error-one-fixable-error.js');
const oneFileOneWarning = require('../fixtures/reports/one-file-one-warning.js');
const oneFileTwoErrorsNoWarningsOneRule = require('../fixtures/reports/one-file-two-errors-no-warnings-one-rule.js');

const RESET = '\x1B[0m';
const BOLD = '\x1B[1m';
const DIM = '\x1B[2m';
const BOLD_OFF = '\x1B[22m';
const RED_FG = '\x1B[31m';
const YELLOW_FG = '\x1B[33m';
const MAGENTA_FG = '\x1B[35m';
const CYAN_FG = '\x1B[36m';
const DEFAULT_FG = '\x1B[39m';
const LIGHT_GRAY_FG = '\x1B[90m';
const LIGHT_YELLOW_FG = '\x1B[93m';
const LIGHT_CYAN_FG = '\x1B[96m';

process.stdout.columns = 100;

test('detailed formatter :: No Issues', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(1);
  const result = detailed(noIssues.results);
  t.equal(result, '');
});

test('detailed formatter :: One Error, One Fixable Error', function (t) {
  t.plan(2);
  const result = detailed(oneFileOneErrorOneFixableError.results, meta);
  t.ok(result, 'returns result');
  t.equal(
    result,
    `

${LIGHT_CYAN_FG}tests/fixtures/files/semi-error/no-semi.js${DEFAULT_FG}:${LIGHT_YELLOW_FG}1${DEFAULT_FG}:${LIGHT_YELLOW_FG}12${DEFAULT_FG} - ${RED_FG}error${DEFAULT_FG} ${DIM}semi https://eslint.org/docs/latest/rules/semi${BOLD_OFF}
Missing semicolon.

${RESET}${RED_FG}${BOLD}>${BOLD_OFF}${DEFAULT_FG}${LIGHT_GRAY_FG} 1 |${DEFAULT_FG} ${CYAN_FG}var${DEFAULT_FG} foo ${YELLOW_FG}=${DEFAULT_FG} ${MAGENTA_FG}1${DEFAULT_FG}
 ${LIGHT_GRAY_FG}   |${DEFAULT_FG}            ${RED_FG}${BOLD}^${BOLD_OFF}${DEFAULT_FG}
${RED_FG}${BOLD}>${BOLD_OFF}${DEFAULT_FG}${LIGHT_GRAY_FG} 2 |${DEFAULT_FG} foo${YELLOW_FG}++${DEFAULT_FG}${YELLOW_FG};${DEFAULT_FG}
 ${LIGHT_GRAY_FG}   |${DEFAULT_FG} ${RED_FG}${BOLD}^${BOLD_OFF}${DEFAULT_FG}${RESET}


${RED_FG}✘ 1 problem (1 error, 0 warnings)${DEFAULT_FG}

Errors  Warnings  Files
     1         0  tests/fixtures/files/semi-error/no-semi.js:${LIGHT_GRAY_FG}1${DEFAULT_FG}
`
  );
});

test('detailed formatter :: One Warning', function (t) {
  t.plan(2);
  const result = detailed(oneFileOneWarning.results, meta);
  t.ok(result, 'returns result');
  t.equal(
    result,
    `

${LIGHT_CYAN_FG}tests/fixtures/files/semi-warn/no-semi.js${DEFAULT_FG}:${LIGHT_YELLOW_FG}1${DEFAULT_FG}:${LIGHT_YELLOW_FG}12${DEFAULT_FG} - ${YELLOW_FG}warning${DEFAULT_FG} ${DIM}semi https://eslint.org/docs/latest/rules/semi${BOLD_OFF}
Missing semicolon.

${RESET}${RED_FG}${BOLD}>${BOLD_OFF}${DEFAULT_FG}${LIGHT_GRAY_FG} 1 |${DEFAULT_FG} ${CYAN_FG}var${DEFAULT_FG} foo ${YELLOW_FG}=${DEFAULT_FG} ${MAGENTA_FG}1${DEFAULT_FG}
 ${LIGHT_GRAY_FG}   |${DEFAULT_FG}            ${RED_FG}${BOLD}^${BOLD_OFF}${DEFAULT_FG}
${RED_FG}${BOLD}>${BOLD_OFF}${DEFAULT_FG}${LIGHT_GRAY_FG} 2 |${DEFAULT_FG} foo${YELLOW_FG}++${DEFAULT_FG}${YELLOW_FG};${DEFAULT_FG}
 ${LIGHT_GRAY_FG}   |${DEFAULT_FG} ${RED_FG}${BOLD}^${BOLD_OFF}${DEFAULT_FG}
 ${LIGHT_GRAY_FG} 3 |${DEFAULT_FG}${RESET}


${YELLOW_FG}⚠ 1 problem (0 errors, 1 warning)${DEFAULT_FG}

Errors  Warnings  Files
     0         1  tests/fixtures/files/semi-warn/no-semi.js:${LIGHT_GRAY_FG}1${DEFAULT_FG}
`
  );
});

test('detailed formatter :: One File, Two Errors, One Rule', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = detailed(oneFileTwoErrorsNoWarningsOneRule.results, meta);
  t.ok(result, 'returns result');
  t.equal(
    result,
    `

${LIGHT_CYAN_FG}tests/fixtures/files/multi-error/two-unused.js${DEFAULT_FG}:${LIGHT_YELLOW_FG}1${DEFAULT_FG}:${LIGHT_YELLOW_FG}5${DEFAULT_FG} - ${RED_FG}error${DEFAULT_FG} ${DIM}no-unused-vars https://eslint.org/docs/latest/rules/no-unused-vars${BOLD_OFF}
'bar' is defined but never used.

${RESET}${RED_FG}${BOLD}>${BOLD_OFF}${DEFAULT_FG}${LIGHT_GRAY_FG} 1 |${DEFAULT_FG} ${CYAN_FG}var${DEFAULT_FG} bar${YELLOW_FG};${DEFAULT_FG}
 ${LIGHT_GRAY_FG}   |${DEFAULT_FG}     ${RED_FG}${BOLD}^${BOLD_OFF}${DEFAULT_FG}${RED_FG}${BOLD}^${BOLD_OFF}${DEFAULT_FG}${RED_FG}${BOLD}^${BOLD_OFF}${DEFAULT_FG}
 ${LIGHT_GRAY_FG} 2 |${DEFAULT_FG} ${CYAN_FG}var${DEFAULT_FG} foo${YELLOW_FG};${DEFAULT_FG}${RESET}


${LIGHT_CYAN_FG}tests/fixtures/files/multi-error/two-unused.js${DEFAULT_FG}:${LIGHT_YELLOW_FG}2${DEFAULT_FG}:${LIGHT_YELLOW_FG}5${DEFAULT_FG} - ${RED_FG}error${DEFAULT_FG} ${DIM}no-unused-vars https://eslint.org/docs/latest/rules/no-unused-vars${BOLD_OFF}
'foo' is defined but never used.

${RESET} ${LIGHT_GRAY_FG} 1 |${DEFAULT_FG} ${CYAN_FG}var${DEFAULT_FG} foo${YELLOW_FG};${DEFAULT_FG}
${RED_FG}${BOLD}>${BOLD_OFF}${DEFAULT_FG}${LIGHT_GRAY_FG} 2 |${DEFAULT_FG} ${CYAN_FG}var${DEFAULT_FG} bar${YELLOW_FG};${DEFAULT_FG}
 ${LIGHT_GRAY_FG}   |${DEFAULT_FG}     ${RED_FG}${BOLD}^${BOLD_OFF}${DEFAULT_FG}${RED_FG}${BOLD}^${BOLD_OFF}${DEFAULT_FG}${RED_FG}${BOLD}^${BOLD_OFF}${DEFAULT_FG}${RESET}


${RED_FG}✘ 2 problems (2 errors, 0 warnings)${DEFAULT_FG}

Errors  Warnings  Files
     2         0  tests/fixtures/files/multi-error/two-unused.js:${LIGHT_GRAY_FG}1${DEFAULT_FG}
`
  );
});
