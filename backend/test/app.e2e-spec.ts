import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import { LinkedinProfile } from '../src/modules/profile/profile.entity';

describe('LinkedIn Leads API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '5432', 10),
          username: process.env.DB_USERNAME || 'postgres',
          password: process.env.DB_PASSWORD || 'postgres',
          database: process.env.DB_DATABASE || 'linkedin_leads_test',
          entities: [LinkedinProfile],
          synchronize: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/profiles', () => {
    it('should return paginated profiles', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/profiles')
        .expect(200);

      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('meta');
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/profiles/search', () => {
    it('should search profiles by keyword', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/profiles/search?keyword=engineer')
        .expect(200);

      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('meta');
    });

    it('should filter by skills', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/profiles/search?skills=TypeScript,React')
        .expect(200);

      expect(res.body).toHaveProperty('data');
    });
  });

  describe('GET /api/profiles/filters', () => {
    it('should return filter options', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/profiles/filters')
        .expect(200);

      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('skills');
      expect(res.body.data).toHaveProperty('industries');
      expect(res.body.data).toHaveProperty('jobTitles');
      expect(res.body.data).toHaveProperty('locations');
      expect(res.body.data).toHaveProperty('companySizes');
    });
  });

  describe('POST /api/profiles', () => {
    it('should import a profile', async () => {
      const profile = {
        full_name: 'Test User',
        first_name: 'Test',
        last_name: 'User',
        job_title: 'Software Engineer',
        job_company_name: 'Test Corp',
        skills: ['TypeScript', 'NestJS'],
      };

      const res = await request(app.getHttpServer())
        .post('/api/profiles')
        .send(profile)
        .expect(201);

      expect(res.body).toHaveProperty('data');
    });
  });
});
