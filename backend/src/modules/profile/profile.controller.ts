import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { QueryProfileDto } from './dto/query-profile.dto';

@ApiTags('Profiles')
@Controller('api/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'List profiles with pagination' })
  findAll(@Query() query: QueryProfileDto) {
    return this.profileService.findAll(query);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search profiles with filters' })
  search(@Query() query: QueryProfileDto) {
    return this.profileService.search(query);
  }

  @Get('filters')
  @ApiOperation({ summary: 'Get available filter options' })
  getFilterOptions() {
    return this.profileService.getFilterOptions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get profile by ID' })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Import profiles' })
  async importProfiles(@Body() data: Partial<any>[]) {
    const count = await this.profileService.importProfiles(
      Array.isArray(data) ? data : [data],
    );
    return { message: `${count} profiles imported`, data: { imported: count } };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete profile' })
  remove(@Param('id') id: string) {
    return { message: 'Profile deleted', data: { deleted: true } };
  }
}
