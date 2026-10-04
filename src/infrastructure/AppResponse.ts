import { AxiosError } from 'axios';

export type SerializerView = 'default' | 'extended';

export interface Pagination {
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  totalPages: number;
  totalCount: number;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  metadata?: Record<string, unknown>;
}

export interface PaginatedSuccessResponse<T> extends SuccessResponse<T[]> {
  pagination: Pagination;
}

export interface ApiError {
  code: number;
  title: string;
  description?: string;
}

export interface ErrorResponse {
  success: false;
  message?: string;
  errorCode: number;
  error?: ApiError;
}

export type AppResponse<T> = SuccessResponse<T> | ErrorResponse;

export interface AppErrorResult {
  httpStatusCode: number;
  data: ErrorResponse;
}

export class AppErrorResultMapper {
  static fromAxiosError(error: AxiosError<ErrorResponse>): AppErrorResult {
    const httpStatusCode = error.response?.status ?? 500;
    const responseData = error.response?.data;

    return {
      httpStatusCode,
      data: {
        success: false,
        errorCode: responseData?.errorCode ?? httpStatusCode,
        message: responseData?.message ?? error.message ?? 'An unknown error occurred',
        error: responseData?.error,
      },
    };
  }

  static fromGeneric(message: string, httpStatusCode = 400): AppErrorResult {
    return {
      httpStatusCode,
      data: {
        success: false,
        errorCode: httpStatusCode,
        message,
      },
    };
  }
}

export function extractErrorMessage(error: unknown, fallback: string): string {
  const axiosError = error as AxiosError<ErrorResponse>;
  return axiosError?.response?.data?.message ?? fallback;
}
