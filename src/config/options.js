/**
 * @fileoverview Options configuration for optionator.
 * @author Ian VanSchooten
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import optionator from 'optionator';

//------------------------------------------------------------------------------
// Initialization and Public Interface
//------------------------------------------------------------------------------


export default optionator({
  prepend: 'usage: eslint-nibble [file.js] [dir]',
  options: [{
    heading: 'Options'
  }, {
    option     : 'help',
    alias      : 'h',
    type       : 'Boolean',
    description: 'Show help'
  }, {
    option     : 'version',
    alias      : 'v',
    type       : 'Boolean',
    description: 'Outputs the version number'
  }, {
    option     : 'ext',
    type       : '[String]',
    default    : '.js',
    description: 'Specify JavaScript file extensions'
  }, {
    option     : 'config',
    alias      : 'c',
    type       : 'path::String',
    description: 'Use configuration from this file or shareable config'
  }, {
    option     : 'cache',
    type       : 'Boolean',
    default    : 'false',
    description: 'Only check changed files'
  }, {
    option     : 'cache-location',
    type       : 'path::String',
    description: 'Path to the cache file or directory'
  }, {
    option              : 'rule',
    type                : '[String]',
    concatRepeatedArrays: true,
    description         : 'Only show results for specified rule(s)'
  }, {
    option     : 'warnings',
    type       : 'Boolean',
    default    : 'true',
    description: 'Include warning results'
  }, {
    option     : 'interactive',
    type       : 'Boolean',
    default    : 'true',
    description: 'Provide interactive options to see/fix a particular error.  If false, linting results are printed with appropriate exit code, useful for CI.'
  }]
});
