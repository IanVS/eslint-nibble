'use strict';

var test = require('tape-catch');
var cli = require('../../lib/cli');
var path = require('path');


test('cli :: works with no arguments', function (t) {
  t.plan(2);

  var nodeBin = process.argv[0];
  var nibbleBin = path.resolve(__dirname + '/../bin/eslint-nibble.js');

  // Temporarily disable console.log
  var origConsoleLog = console.log;
  console.log = function () {};

  var exitCode = cli.execute([nodeBin, nibbleBin]);

  // Restore console.log
  console.log = origConsoleLog;

  t.equal(exitCode, 0, 'exits with 0 if no options given (apart from first two of process.argv)');
  t.equal(cli.execute(), 1, 'exits with 1 if no arguments passed in at all');
});

