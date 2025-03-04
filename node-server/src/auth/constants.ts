import {
  createParamDecorator,
  SetMetadata,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export const jwtConstants = {
  secret: 'JWT_SECRET', // TODO: Change this to be fetched securely from an environment variable
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    // FIXME: `Unsafe return of a value of type error.`
    return request['jwt-user'];
  },
);
