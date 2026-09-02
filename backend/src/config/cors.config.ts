import { Logger, INestApplication } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const logger = new Logger('CorsConfig');

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
];

export function setupCors(app: INestApplication): void {
  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      const isDevelopment = process.env.NODE_ENV === 'development';

      if (!origin && isDevelopment) {
        callback(null, true);
      } else if (origin && ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        logger.warn(`CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization'],
  };

  app.enableCors(corsOptions);
  logger.log(
    `CORS enabled with ${ALLOWED_ORIGINS.length} allowed origin(s): ${ALLOWED_ORIGINS.join(', ')}`,
  );
}
