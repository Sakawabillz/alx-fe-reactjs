// Simple test file to verify Jest is working
const sum = (a, b) => a + b;

describe('Simple Test Suite', () => {
  beforeAll(() => {
    console.log('Before all tests');
  });

  afterAll(() => {
    console.log('After all tests');
  });

  it('should pass a basic assertion', () => {
    console.log('Running basic test');
    expect(true).toBe(true);
  });

  it('should correctly add two numbers', () => {
    console.log('Running addition test');
    expect(sum(1, 2)).toBe(3);
  });
});
