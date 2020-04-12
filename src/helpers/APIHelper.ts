export enum ApiErrors {
  'missing_authentication' = 'The request does not have the authentication header',
  'token_expired' = 'Token expired',
  'invalid_parameters' = 'Request with missing or invalid parameters',
  'validation_error' = 'Request with invalid data',
  'authentication_error' = 'Unauthorized: Authentication error',
}

export enum ApiMessages {
  'public' = 'public',
  'authenticated' = 'authenticated',
  'logged_ok' = 'Logged OK',
  'register_ok' = 'Register OK',
}

export interface IApiResponse {
  result: any;
  status: string;
}

export interface IApiErrorResponse {
  error: {
    name: string;
    message: string;
    type: string;
  };
}
