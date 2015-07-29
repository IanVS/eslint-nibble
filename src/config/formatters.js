/*
These will be used as custom formatters.
 */

import path from 'path';

export var stats = path.resolve(__dirname + '/../../node_modules/eslint-stats/byErrorAndWarning.js');
export var summary = path.resolve(__dirname + '/../../node_modules/eslint-summary/summary.js');
export var detailed = path.resolve(__dirname + '/../../node_modules/eslint-friendly-formatter/index.js');
