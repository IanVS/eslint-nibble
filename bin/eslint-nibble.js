#!/usr/bin/env node

var cli = require('../lib/cli');

var exitCode = cli.execute(process.argv);

/*
 * Wait for the stdout buffer to drain.
 */
process.on('exit', function () {
  process.exit(exitCode);
});
