// Test file using CommonJS and Mocha
console.log('Test file is being executed');
const assert = require('assert');

// Simple function to test
const sum = (a, b) => a + b;

console.log('Test setup complete');

describe('Simple Test Suite', function() {
  console.log('Test suite is being set up');
  // Test case 1: Basic addition
  it('should correctly add two numbers', function() {
    console.log('Running addition test');
    const result = sum(2, 3);
    assert.strictEqual(result, 5, '2 + 3 should equal 5');
  });

  // Test case 2: String concatenation
  it('should concatenate strings', function() {
    const result = 'Hello, ' + 'World!';
    assert.strictEqual(result, 'Hello, World!');
  });

  // Test case 3: Array operations
  it('should work with arrays', function() {
    const arr = [1, 2, 3];
    arr.push(4);
    assert.strictEqual(arr.length, 4);
    assert.deepStrictEqual(arr, [1, 2, 3, 4]);
  });
});
