import { Component, type ErrorInfo } from 'react';
import type {
  IErrorBoundaryProps,
  IErrorBoundaryState,
} from '../../../types/types';

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  state = {
    error: false,
  };

  render() {
    if (this.state.error) {
      return (
        <>
          <h3 className="mb-3 mt-4 text-red-500 text-2xl font-bold">
            ⚠️ Something went wrong while rendering ⚠️
          </h3>
          <p className="mb-4 mt-3 text-red-500 text-xl font-bold">
            Please Try Again
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500
             hover:bg-gradient-to-l focus:ring-4 focus:outline-none
             focus:ring-purple-200 dark:focus:ring-purple-800
             font-medium rounded-lg text-xs
             px-4 py-2
             whitespace-nowrap"
          >
            Try Again
          </button>
        </>
      );
    }

    return this.props.children;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error: true,
    });
  }
}

export default ErrorBoundary;
