/*
These will be used as custom formatters.
 */

import resolve from 'resolve';

export var stats = resolve.sync('eslint-stats/byErrorAndWarning.js');
export var summary = resolve.sync('eslint-summary/summary.js');
export var detailed = resolve.sync('eslint-formatter-friendly');
