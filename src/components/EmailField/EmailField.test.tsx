import { render, type RenderResult } from '@testing-library/react';
import EmailField from './EmailField';

const setup = (): RenderResult & { emailInput: HTMLInputElement } => {
  const result = render(<EmailField />);
  return { ...result, emailInput: result.getByTestId('email-input') as HTMLInputElement };
};

test('renders input field with label', () => {
  const { emailInput } = setup();
  expect(emailInput).toBeInTheDocument();
});

// Add more tests as required
