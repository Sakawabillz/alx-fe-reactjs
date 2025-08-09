// Simple test to verify the testing setup
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Setup Test', () => {
  it('should pass a basic test', () => {
    render(<div>Test</div>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
