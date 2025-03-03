import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'JWT_SECRET', // TODO: Change this to be fetched securely from an environment variable
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
