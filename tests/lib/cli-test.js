'use strict';

var test = require('tape-catch');
var cli = require('../../lib/cli');
var path = require('path');


test('cli :: works with no arguments', function (t) {
  t.plan(3);

  var nodeBin = process.argv[0];
  var nibbleBin = path.resolve(path.join(__dirname, '/../bin/eslint-nibble.js'));

  // Overwrite console methods
  var origConsoleLog = console.log;
  var origConsoleErr = console.error;
  console.error = function (input) {
    console.error = origConsoleErr;
    t.equal(input, 'Invalid argument to \'parse\': undefined.');
  };

  mockLogOnce(origConsoleLog);
  t.equal(cli.execute([nodeBin, nibbleBin]), 0, 'exits with 0 if no options given (apart from first two of process.argv)');
  t.equal(cli.execute(), 1, 'exits with 1 if no arguments passed in at all');

  // Restore console
  console.log = origConsoleLog;
  console.error = origConsoleErr;
});

test('cli :: returns 2 if it crashes', function (t) {
  t.plan(1);

  var nodeBin = process.argv[0];
  var nibbleBin = path.resolve(path.join(__dirname, '/../bin/eslint-nibble.js'));
  var pathToTest = path.resolve(path.join(__dirname, '../fixtures/files/fatal-error/fatal.js'));

  // Overwrite console methods
  var origConsoleLog = console.log;
  var origConsoleErr = console.error;
  console.error = function () {};
  mockLogOnce(origConsoleLog);

  t.equal(cli.execute([nodeBin, nibbleBin, pathToTest]), 2, 'exits with 2 if there are fatal errors');

  // Restore console
  console.log = origConsoleLog;
  console.error = origConsoleErr;
});

test('cli :: returns exit code without menu when --no-interactive is set', function (t) {
  t.plan(4);

  var nodeBin = process.argv[0];
  var nibbleBin = path.resolve(path.join(__dirname, '/../bin/eslint-nibble.js'));
  var erroringPath = path.resolve(path.join(__dirname, '../fixtures/files/semi-error/no-semi.js'));
  var warningPath = path.resolve(path.join(__dirname, '../fixtures/files/semi-warn/no-semi.js'));
  var okayPath = path.resolve(path.join(__dirname, '../fixtures/files/semi-okay/semi.js'));

  // Overwrite console methods
  var origConsoleLog = console.log;
  var origConsoleErr = console.error;
  console.error = function () {};

  mockLogOnce(origConsoleLog);
  t.equal(cli.execute([nodeBin, nibbleBin, erroringPath, '--no-interactive']), 1, 'exits with 1 if there are errors');
  mockLogOnce(origConsoleLog);
  t.equal(cli.execute([nodeBin, nibbleBin, warningPath, '--no-interactive']), 0, 'exits with 0 if only warnings');
  mockLogOnce(origConsoleLog);
  t.equal(cli.execute([nodeBin, nibbleBin, okayPath, '--no-interactive']), 0, 'exits with 0 if no problems');
  mockLogOnce(function () {
    console.log = origConsoleLog;
  });
  t.equal(cli.execute([nodeBin, nibbleBin, erroringPath, '--no-interactive', '--rule', 'prefer-const']), 0, 'exits with 0 if all problems are filtered out');

  // Restore console
  console.log = origConsoleLog;
  console.error = origConsoleErr;
});

// Helper function that will ignore one console.log, but reset to the original after that.
// This lets us ignore output from the cli, while allowing through tap results.
function mockLogOnce(originalConsoleLog) {
  console.log = function () {
    console.log = originalConsoleLog;
  };
}
