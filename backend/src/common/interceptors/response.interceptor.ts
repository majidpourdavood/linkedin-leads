import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const statusCode: number = response.statusCode || HttpStatus.OK;

    const action = `${request.method} ${request.originalUrl}`;

    return next.handle().pipe(
      map((data: unknown) => {
        if (
          data &&
          typeof data === 'object' &&
          'statusCode' in (data as Record<string, unknown>)
        ) {
          return data;
        }

        const dataObj = data as Record<string, unknown> | null;

        const isPaginatedShape =
          dataObj !== null && 'data' in dataObj && 'meta' in dataObj;

        if (isPaginatedShape) {
          const payload = dataObj as {
            message?: string;
            data: unknown;
            meta?: Record<string, unknown>;
          };
          return {
            statusCode,
            error: null,
            message: payload?.message || 'Request completed successfully',
            action,
            data: payload.data ?? null,
            meta: payload.meta ?? undefined,
          };
        }

        return {
          statusCode,
          error: null,
          message: (dataObj?.message as string) || 'Request completed successfully',
          action,
          data: data ?? null,
        };
      }),
    );
  }
}
