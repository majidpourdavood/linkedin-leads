import { HttpStatus } from '@nestjs/common';

export class Helpers {
  static sendJson(
    statusCode: HttpStatus | number,
    error: string | null,
    message: string,
    action: string,
    data: unknown,
    meta?: Record<string, unknown>,
  ) {
    return {
      statusCode,
      error,
      message,
      action,
      data,
      ...(meta !== undefined ? { meta } : {}),
    };
  }
}
