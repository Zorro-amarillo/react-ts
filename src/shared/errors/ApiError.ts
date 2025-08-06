import type { IApiError } from '../types';

class ApiError extends Error implements IApiError {
  status: number;
  errorText: string;

  constructor(message: string, status: number, errorText: string) {
    super(message);
    this.name = 'ServiceError';
    this.status = status;
    this.errorText = errorText;
  }
}

export default ApiError;
