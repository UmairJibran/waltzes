import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from './constants';
import { RegisterUserDto } from './dto/register-user.dto';
import {
  InvalidCredentialsException,
  ValidationException,
} from '../common/exceptions/application.exceptions';

interface ValidationError {
  name: string;
  errors: Record<string, string[]>;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async signIn(@Body() signInDto: LoginUserDto) {
    try {
      const result = await this.authService.signIn(
        signInDto.email,
        signInDto.password,
      );
      return result;
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid credentials') {
        throw new InvalidCredentialsException();
      }
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('register')
  async signUp(@Body() registerUserDto: RegisterUserDto) {
    try {
      const result = await this.authService.register(registerUserDto);
      return result;
    } catch (error) {
      if (this.isValidationError(error)) {
        throw new ValidationException(error.errors);
      }
      throw error;
    }
  }

  private isValidationError(error: unknown): error is ValidationError {
    return (
      error !== null &&
      typeof error === 'object' &&
      'name' in error &&
      error.name === 'ValidationError' &&
      'errors' in error
    );
  }
}
