import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseBuilder } from '../types/api-response';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // If the response is already in our API format, return it as is
        if (data?.success !== undefined) {
          return data;
        }
        // Otherwise wrap it in our success response format
        return ApiResponseBuilder.success(data);
      }),
    );
  }
}
