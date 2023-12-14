import { render, fireEvent, screen } from '@testing-library/react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import { BrowserRouter as Router } from 'react-router-dom';
import { type ReactNode } from 'react';

// Dummy component that throws an error
const ComponentWithError = (): ReactNode => {
  throw new Error('Unique test error message');
};

describe('ErrorFallback', () => {
  it('renders when an error is thrown', () => {
    render(
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ComponentWithError />
        </ErrorBoundary>
      </Router>
    );
    expect(screen.getByText(/Unique test error message./i)).toBeInTheDocument();

    const button = screen.getByText(/Return to the homepage/i);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
  });

  const error = { name: 'Test Error', message: 'This is a test error.' };
  const resetErrorBoundary = jest.fn();

  it('renders without crashing', () => {
    render(
      <Router>
        <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
      </Router>
    );
  });

  it('displays the error message', () => {
    render(
      <Router>
        <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
      </Router>
    );
    expect(screen.getByText(/Test Error: This is a test error./i)).toBeInTheDocument();
  });

  it('calls resetErrorBoundary and navigates to homepage on button click', () => {
    render(
      <Router>
        <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
      </Router>
    );
    const button = screen.getByText(/Return to the homepage/i);
    fireEvent.click(button);
    expect(resetErrorBoundary).toHaveBeenCalled();
  });
});
