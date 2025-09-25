'use strict';

const test = require('tape');
const detailed = require('../../src/detailed.js');

const noIssues = require('../fixtures/reports/no-issues.js');
const oneFileOneErrorOneFixableError = require('../fixtures/reports/one-file-one-error-one-fixable-error.js');
const oneFileOneWarning = require('../fixtures/reports/one-file-one-warning.js');
const oneFileTwoErrorsNoWarningsOneRule = require('../fixtures/reports/one-file-two-errors-no-warnings-one-rule.js');

const RESET = '\x1B[0m';
const RED_FG = '\x1B[31m';
const YELLOW_FG = '\x1B[33m';
const MAGENTA_FG = '\x1B[35m';
const CYAN_FG = '\x1B[36m';
const DEFAULT_FG = '\x1B[39m';
const LIGHT_GRAY_FG = '\x1B[90m';
const BOLD = '\x1B[1m';
const BOLD_OFF = '\x1B[22m';

process.stdout.columns = 100;

test('detailed formatter :: No Issues', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(1);
  const result = detailed(noIssues.results);
  t.equal(result, '');
});

test('detailed formatter :: One Error, One Fixable Error', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = detailed(oneFileOneErrorOneFixableError.results);
  t.ok(result, 'returns result');
  t.equal(
    result,
    `

  ✘  http://eslint.org/docs/rules/semi

     Missing semicolon


     tests/fixtures/files/semi-error/no-semi.js:1:12
   ${RESET}${RED_FG}${BOLD}>${BOLD_OFF}${DEFAULT_FG}${LIGHT_GRAY_FG} 1 | ${DEFAULT_FG}${CYAN_FG}var${DEFAULT_FG} foo ${YELLOW_FG}=${DEFAULT_FG} ${MAGENTA_FG}1${DEFAULT_FG}${RESET}
   ${RESET} ${LIGHT_GRAY_FG}   | ${DEFAULT_FG}           ${RED_FG}${BOLD}^${BOLD_OFF}${DEFAULT_FG}${RESET}
   ${RESET} ${LIGHT_GRAY_FG} 2 | ${DEFAULT_FG}foo${YELLOW_FG}++${DEFAULT_FG}${YELLOW_FG};${DEFAULT_FG}${RESET}
   ${RESET} ${LIGHT_GRAY_FG} 3 | ${DEFAULT_FG}${RESET}

✘ 1 problem (1 error, 0 warnings)


Errors:
  1  http://eslint.org/docs/rules/semi`
  );
});

test('detailed formatter :: One Warning', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = detailed(oneFileOneWarning.results);
  t.ok(result, 'returns result');
  t.equal(
    result,
    `

  ⚠  http://eslint.org/docs/rules/semi

     Missing semicolon


     tests/fixtures/files/semi-warn/no-semi.js:1:12
   ${RESET}${RED_FG}${BOLD}>${BOLD_OFF}${DEFAULT_FG}${LIGHT_GRAY_FG} 1 | ${DEFAULT_FG}${CYAN_FG}var${DEFAULT_FG} foo ${YELLOW_FG}=${DEFAULT_FG} ${MAGENTA_FG}1${DEFAULT_FG}${RESET}
   ${RESET} ${LIGHT_GRAY_FG}   | ${DEFAULT_FG}           ${RED_FG}${BOLD}^${BOLD_OFF}${DEFAULT_FG}${RESET}
   ${RESET} ${LIGHT_GRAY_FG} 2 | ${DEFAULT_FG}foo${YELLOW_FG}++${DEFAULT_FG}${YELLOW_FG};${DEFAULT_FG}${RESET}
   ${RESET} ${LIGHT_GRAY_FG} 3 | ${DEFAULT_FG}${RESET}

✘ 1 problem (0 errors, 1 warning)


Warnings:
  1  http://eslint.org/docs/rules/semi
`
  );
});

test('detailed formatter :: One File, Two Errors, One Rule', function (t) {
  process.env.FORCE_COLOR = 1;
  t.plan(2);
  const result = detailed(oneFileTwoErrorsNoWarningsOneRule.results);
  t.ok(result, 'returns result');
  t.equal(
    result,
    `

  ✘  http://eslint.org/docs/rules/no-unused-vars

     'bar' is defined but never used


     tests/fixtures/files/multi-error/two-unused.js:1:5
   ${RESET}${RED_FG}${BOLD}>${BOLD_OFF}${DEFAULT_FG}${LIGHT_GRAY_FG} 1 | ${DEFAULT_FG}${CYAN_FG}var${DEFAULT_FG} bar${YELLOW_FG};${DEFAULT_FG}${RESET}
   ${RESET} ${LIGHT_GRAY_FG}   | ${DEFAULT_FG}    ${RED_FG}${BOLD}^${BOLD_OFF}${DEFAULT_FG}${RESET}
   ${RESET} ${LIGHT_GRAY_FG} 2 | ${DEFAULT_FG}${CYAN_FG}var${DEFAULT_FG} foo${YELLOW_FG};${DEFAULT_FG}${RESET}
   ${RESET} ${LIGHT_GRAY_FG} 3 | ${DEFAULT_FG}${RESET}

  ✘  http://eslint.org/docs/rules/no-unused-vars

     'foo' is defined but never used


     tests/fixtures/files/multi-error/two-unused.js:2:5
   ${RESET} ${LIGHT_GRAY_FG} 1 | ${DEFAULT_FG}${CYAN_FG}var${DEFAULT_FG} bar${YELLOW_FG};${DEFAULT_FG}${RESET}
   ${RESET}${RED_FG}${BOLD}>${BOLD_OFF}${DEFAULT_FG}${LIGHT_GRAY_FG} 2 | ${DEFAULT_FG}${CYAN_FG}var${DEFAULT_FG} foo${YELLOW_FG};${DEFAULT_FG}${RESET}
   ${RESET} ${LIGHT_GRAY_FG}   | ${DEFAULT_FG}    ${RED_FG}${BOLD}^${BOLD_OFF}${DEFAULT_FG}${RESET}
   ${RESET} ${LIGHT_GRAY_FG} 3 | ${DEFAULT_FG}${RESET}

✘ 2 problems (2 errors, 0 warnings)


Errors:
  2  http://eslint.org/docs/rules/no-unused-vars`
  );
});
