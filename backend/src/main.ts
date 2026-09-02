import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { setupCors } from './config/cors.config';
import { ApiValidationPipe } from './common/pipes/api-validation.pipe';
import { runSeeders } from './database/seeders.bootstrap';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  app.useGlobalPipes(new ApiValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  setupCors(app);

  const config = new DocumentBuilder()
    .setTitle('LinkedIn Leads API')
    .setDescription('API for searching and managing LinkedIn profiles')
    .setVersion('1.0')
    .addTag('Profiles', 'Profile CRUD and search operations')
    .addTag('Search', 'ElasticSearch powered search')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.APP_PORT || 3001;
  await app.listen(port);
  console.log(`Backend running on: http://localhost:${port}`);
  console.log(`Swagger docs: http://localhost:${port}/api/docs`);

  try {
    await runSeeders(app);
  } catch (error) {
    console.error('Seeder failed:', error);
  }
}
bootstrap();
