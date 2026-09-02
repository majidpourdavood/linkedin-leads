import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Helpers } from '../helpers';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message =
        typeof res === 'string'
          ? res
          : ((res as Record<string, unknown>).message as string) || message;
    }

    console.error('[Exception Filter]', {
      status,
      message: exception instanceof Error ? exception.message : message,
      stack: exception instanceof Error ? exception.stack : undefined,
      url: request.originalUrl,
      method: request.method,
    });

    const action = `${request.method} ${request.originalUrl}`;

    response
      .status(status)
      .json(Helpers.sendJson(status, message, message, action, null));
  }
}
