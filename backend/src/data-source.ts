import { DataSource } from 'typeorm';
import { LinkedinProfile } from './modules/profile/profile.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'linkedin_leads',
  entities: [LinkedinProfile],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});
