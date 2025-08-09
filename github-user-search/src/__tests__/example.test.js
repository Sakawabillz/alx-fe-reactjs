// Basic test to verify the testing environment
const sum = (a, b) => a + b;

describe('Example Test', () => {
  it('should add two numbers correctly', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
