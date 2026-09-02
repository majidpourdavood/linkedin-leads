import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkedinProfile } from '../profile/profile.entity';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([LinkedinProfile]), ProfileModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
