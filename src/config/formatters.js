/*
These will be used as custom formatters.
 */

import resolve from 'resolve';

export var stats = resolve.sync('eslint-stats/byErrorAndWarning.js', { cwd: process.cwd() });
export var summary = resolve.sync('eslint-summary/summary.js', { cwd: process.cwd() });
export var detailed = resolve.sync('eslint-formatter-friendly', { cwd: process.cwd() });
