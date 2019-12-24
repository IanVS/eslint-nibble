'use strict';

var test = require('tape-catch');
var cli = require('../../lib/cli');
var path = require('path');


test('cli :: works with no arguments', function (t) {
  t.plan(2);

  var nodeBin = process.argv[0];
  var nibbleBin = path.resolve(path.join(__dirname, '/../bin/eslint-nibble.js'));

  // Temporarily disable console
  var origConsoleLog = console.log;
  var origConsoleErr = console.error;
  console.log = function () {};
  console.error = function () {};

  t.equal(cli.execute([nodeBin, nibbleBin]), 0, 'exits with 0 if no options given (apart from first two of process.argv)');
  t.equal(cli.execute(), 1, 'exits with 1 if no arguments passed in at all');

  // Restore console.log
  console.log = origConsoleLog;
  console.error = origConsoleErr;
});

test('cli :: returns 2 if it crashes', function (t) {
  t.plan(1);

  var nodeBin = process.argv[0];
  var nibbleBin = path.resolve(path.join(__dirname, '/../bin/eslint-nibble.js'));
  var pathToTest = path.resolve(path.join(__dirname, '../fixtures/files/fatal-error/fatal.js'));

  // Temporarily disable console
  var origConsoleLog = console.log;
  var origConsoleErr = console.error;
  console.log = function () {};
  console.error = function () {};

  t.equal(cli.execute([nodeBin, nibbleBin, pathToTest]), 2, 'exits with 2 if there are fatal errors');

  // Restore console.log
  console.log = origConsoleLog;
  console.error = origConsoleErr;
});
