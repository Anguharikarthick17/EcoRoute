export interface ApiResponseOptions {
  status?: number;
  headers?: Record<string, string>;
}

export interface ApiSuccessPayload<T = unknown> {
  success: true;
  message?: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorPayload {
  success: false;
  message: string;
  code?: string;
  errors?: unknown;
}

/**
 * Creates a standardized JSON success response.
 * Uses standard Web API Response.json compatible with Next.js App Router and Node runtimes.
 */
export function successResponse<T>(
  data?: T,
  message?: string,
  options: ApiResponseOptions = {}
): Response {
  const status = options.status ?? 200;
  return Response.json(
    {
      success: true,
      ...(message ? { message } : {}),
      ...(data !== undefined ? { data } : {}),
    },
    { status, headers: options.headers }
  );
}

/**
 * Creates a standardized, secure JSON error response.
 * Sanitizes internal details so sensitive system information, credentials,
 * or raw stack traces are never exposed to the client.
 */
export function errorResponse(
  error: unknown,
  fallbackMessage: string = "An unexpected error occurred. Please try again later.",
  statusCode: number = 500
): Response {
  // Always log on the server for diagnostics
  if (process.env.NODE_ENV !== "production") {
    console.error("[API Error Diagnostic]:", error);
  }

  let safeMessage = fallbackMessage;
  let validationErrors: unknown = undefined;
  let errorCode: string | undefined = undefined;

  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;

    // Handle Zod validation errors
    if (err.name === "ZodError" && Array.isArray(err.errors)) {
      safeMessage = "Validation failed for provided input.";
      validationErrors = err.errors;
      return Response.json(
        {
          success: false,
          message: safeMessage,
          code: "VALIDATION_ERROR",
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    // Handle common HTTP error formats
    if (typeof err.message === "string") {
      const msg = err.message;
      // Strip potentially sensitive database or path details
      const isSensitive =
        msg.includes("DATABASE_URL") ||
        msg.includes("prisma") ||
        msg.includes("password") ||
        msg.includes("secret") ||
        msg.includes("/Users/") ||
        msg.includes("/home/");

      if (!isSensitive && statusCode < 500) {
        safeMessage = msg;
      }
    }

    if (typeof err.code === "string") {
      errorCode = err.code;
    }
  }

  return Response.json(
    {
      success: false,
      message: safeMessage,
      ...(errorCode ? { code: errorCode } : {}),
    },
    { status: statusCode }
  );
}

