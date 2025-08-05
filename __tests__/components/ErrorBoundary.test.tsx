import { render, screen } from '@testing-library/react';

import { ErrorBoundary } from '@/components';

describe('ErrorBoundary', () => {
  it('should render content when no error', () => {
    render(
      <ErrorBoundary>
        <div>Some content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Some content')).toBeInTheDocument();
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });

  it('should show error message, when child throws error', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const ErrorComponent = () => {
      throw new Error('ErrorBoundary test');
    };

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Please Try Again/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Try Again/i })).toBeInTheDocument();

    vi.restoreAllMocks();
  });
});
