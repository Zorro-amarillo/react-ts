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
      return <p>Warning</p>;
    }

    return this.props.children;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
    this.setState({
      error: true,
    });
  }
}

export default ErrorBoundary;
