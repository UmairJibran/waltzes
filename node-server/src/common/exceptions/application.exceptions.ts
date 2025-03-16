import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends HttpException {
  constructor(resource: string, id?: string) {
    super(
      {
        message: `${resource}${id ? ` with id ${id}` : ''} not found`,
        code: 'RESOURCE_NOT_FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(
      {
        message: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class DuplicateResourceException extends HttpException {
  constructor(resource: string, field: string) {
    super(
      {
        message: `${resource} with this ${field} already exists`,
        code: 'DUPLICATE_RESOURCE',
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class UnauthorizedAccessException extends HttpException {
  constructor() {
    super(
      {
        message: 'You are not authorized to perform this action',
        code: 'UNAUTHORIZED_ACCESS',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}

export class ValidationException extends HttpException {
  constructor(errors: Record<string, string[]>) {
    super(
      {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
} 