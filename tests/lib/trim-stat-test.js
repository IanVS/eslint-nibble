'use strict';

var test = require('tape-catch');
var trimStat = require('../../lib/trim-stat');

test('trimStat()', function (outer) {
  outer.test('trims three characters of whitespace when length is three greater than max', function (t) {
    t.plan(1);
    const stat = 'semi:  \u001b[35m  8\u001b[39m|\u001b[41m               \u001b[49m';
    const expected = 'semi:  \u001b[35m  8\u001b[39m|\u001b[41m            \u001b[49m';
    const result = trimStat(stat, stat.length - 3);
    t.equal(result, expected, 'three spaces trimmed');
  });

  outer.test('trims one character of whitespace when length is one greater than max', function (t) {
    t.plan(1);
    const stat = 'semi:  \u001b[35m  8\u001b[39m|\u001b[41m               \u001b[49m';
    const expected = 'semi:  \u001b[35m  8\u001b[39m|\u001b[41m              \u001b[49m';
    const result = trimStat(stat, stat.length - 1);
    t.equal(result, expected, 'one space trimmed');
  });

  outer.test('returns original string if length is equal to max', function (t) {
    t.plan(1);
    const stat = 'semi:  \u001b[35m  8\u001b[39m|\u001b[41m               \u001b[49m';
    const result = trimStat(stat, stat.length);
    t.equal(result, stat, 'original string returned');
  });

  outer.test('returns original string if length is less than max', function (t) {
    t.plan(1);
    const stat = 'semi:  \u001b[35m  8\u001b[39m|\u001b[41m               \u001b[49m';
    const result = trimStat(stat, stat.length + 1);
    t.equal(result, stat, 'original string returned');
  });
});
