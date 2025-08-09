// Minimal test file using Node's test runner
const { test } = require('node:test');
const assert = require('node:assert');

console.log('Minimal test file loaded');

test('should pass a basic test', (t) => {
  console.log('Running basic test');
  assert.strictEqual(1 + 1, 2, '1 + 1 should equal 2');
});
