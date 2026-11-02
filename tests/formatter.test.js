const test = require('node:test');
const assert = require('node:assert/strict');
const { extractIds, formatIds } = require('../formatter');

test('preserves mixed letter and digit IDs when delimiters exist', () => {
  const input = 'VIP123;;;;SSS456; AB789 AB12CD34';
  assert.deepEqual(extractIds(input), ['VIP123', 'SSS456', 'AB789', 'AB12CD34']);
});

test('handles Chinese punctuation and quote choices', () => {
  assert.equal(formatIds('“AB123”、\'CD456\'', "'"), "'AB123',\n'CD456'");
});

test('splits adjacent letter-number IDs only without delimiters', () => {
  assert.deepEqual(extractIds('AB123CD456'), ['AB123', 'CD456']);
  assert.deepEqual(extractIds('AB123CD456 EF789'), ['AB123CD456', 'EF789']);
});

test('splits numeric IDs by explicit length', () => {
  assert.deepEqual(extractIds('1234567', 3), ['123', '456', '7']);
});
