/**
 * @fileoverview Options configuration for optionator.
 * @author Ian VanSchooten
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const optionator = require('optionator');

//------------------------------------------------------------------------------
// Initialization and Public Interface
//------------------------------------------------------------------------------


module.exports = optionator({
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
    option     : 'resolve-plugins-relative-to',
    type       : 'path::String',
    description: 'Changes the folder where plugins are resolved from'
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
    option              : 'rulesdir',
    type                : '[String]',
    concatRepeatedArrays: true,
    description         : 'Path to custom eslint rules'
  }, {
    option     : 'warnings',
    type       : 'Boolean',
    default    : 'true',
    description: 'Include warning results'
  }, {
    option     : 'multi',
    type       : 'Boolean',
    default    : 'false',
    description: 'Allow fixing multiple rules at one time'
  }, {
    option     : 'interactive',
    type       : 'Boolean',
    default    : 'true',
    description: 'Provide interactive options to see/fix a particular error.  If false, linting results are printed with appropriate exit code, useful for CI.'
  }, {
    option     : 'format',
    alias      : 'f',
    type       : 'String',
    description: 'If --no-interactive is used, this formatter will be used to output results.  See https://eslint.org/docs/user-guide/formatters for options.'
  }, {
    option     : 'fixable-only',
    type       : 'Boolean',
    description: 'Only show fixable rules in output results'
  }],
  helpStyle: {
    maxPadFactor: 2.5
  }
});
