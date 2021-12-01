#!/usr/bin/env node

var cli = require('../src/cli');

(async function () {
  var exitCode = await cli.execute(process.argv);
  /*
  * Wait for the stdout buffer to drain.
  */
  process.on('exit', function () {
    process.exit(exitCode);
  });
})();
