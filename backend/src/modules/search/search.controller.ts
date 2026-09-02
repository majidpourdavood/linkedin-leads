import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { ProfileService } from '../profile/profile.service';
import { QueryProfileDto } from '../profile/dto/query-profile.dto';

@ApiTags('Search')
@Controller('api/search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Search profiles with ElasticSearch (fallback to DB)' })
  async search(@Query() query: QueryProfileDto) {
    let result = await this.searchService.searchWithElastic(query);
    if (!result) {
      result = await this.profileService.search(query);
    }
    return result;
  }

  @Get('index')
  @ApiOperation({ summary: 'Index all profiles to ElasticSearch' })
  async indexAll() {
    const count = await this.searchService.indexAllProfiles();
    return { message: `${count} profiles indexed`, data: { indexed: count } };
  }
}
