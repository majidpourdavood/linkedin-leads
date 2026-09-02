import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkedinProfile } from './profile.entity';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LinkedinProfile])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
