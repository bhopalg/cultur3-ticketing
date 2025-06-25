type ErrorResponse<T> = {
  success: false;
  message?: string;
  data?: T;
  error: string;
};

export type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  error?: string;
};

export type ActionResponse<T> = ErrorResponse<T> | SuccessResponse<T>;
