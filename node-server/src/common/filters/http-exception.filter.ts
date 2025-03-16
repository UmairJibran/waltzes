import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponseBuilder } from '../types/api-response';

interface HttpExceptionResponse {
  message?: string;
  code?: string;
  details?: unknown;
  statusCode?: number;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code = 'INTERNAL_SERVER_ERROR';
    let details: unknown;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse =
        exception.getResponse() as HttpExceptionResponse;

      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse.message || exception.message;

      code = exceptionResponse.code || this.getErrorCode(status);
      details = exceptionResponse.details;
    }

    response
      .status(status)
      .json(
        ApiResponseBuilder.error(code, message, details as Record<string, any>),
      );
  }

  private getErrorCode(status: number): string {
    switch (status) {
      case 400:
        return HttpStatus.BAD_REQUEST.toString().toUpperCase();
      case 401:
        return HttpStatus.UNAUTHORIZED.toString().toUpperCase();
      case 403:
        return HttpStatus.FORBIDDEN.toString().toUpperCase();
      case 404:
        return HttpStatus.NOT_FOUND.toString().toUpperCase();
      case 409:
        return HttpStatus.CONFLICT.toString().toUpperCase();
      case 402:
        return HttpStatus.PAYMENT_REQUIRED.toString().toUpperCase();
      case 429:
        return HttpStatus.TOO_MANY_REQUESTS.toString().toUpperCase();
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR.toString().toUpperCase();
    }
  }
}
