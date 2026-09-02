import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './modules/profile/profile.module';
import { SearchModule } from './modules/search/search.module';
import { LinkedinProfile } from './modules/profile/profile.entity';
import { LinkedinProfileSeeder } from './database/seeds/linkedin-profile.seeder';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD', 'postgres'),
        database: config.get<string>('DB_DATABASE', 'linkedin_leads'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    TypeOrmModule.forFeature([LinkedinProfile]),
    ProfileModule,
    SearchModule,
  ],
  providers: [LinkedinProfileSeeder],
})
export class AppModule {}
