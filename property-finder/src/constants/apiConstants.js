export const API_BASE_URL = "http://localhost:8080/api";

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your internet connection.",
  SERVER_ERROR: "Server error. Please try again later.",
  NOT_FOUND: "The requested resource was not found.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  DEFAULT: "An error occurred. Please try again.",
};
