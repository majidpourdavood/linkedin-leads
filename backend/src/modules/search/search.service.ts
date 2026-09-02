import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import elasticClient, { PROFILE_INDEX } from '../../shared/elastic/elastic-client';
import { LinkedinProfile } from '../profile/profile.entity';
import { QueryProfileDto } from '../profile/dto/query-profile.dto';
import { ProfileMapper } from '../profile/mappers/profile.mapper';
import type { QueryDslQueryContainer } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(
    @InjectRepository(LinkedinProfile)
    private readonly profileRepo: Repository<LinkedinProfile>,
  ) {}

  async indexProfile(profile: LinkedinProfile): Promise<void> {
    try {
      await elasticClient.index({
        index: PROFILE_INDEX,
        id: profile.id,
        document: {
          full_name: profile.full_name,
          first_name: profile.first_name,
          last_name: profile.last_name,
          gender: profile.gender,
          industry: profile.industry,
          job_title: profile.job_title,
          job_company_name: profile.job_company_name,
          job_company_size: profile.job_company_size,
          job_company_industry: profile.job_company_industry,
          job_company_location_name: profile.job_company_location_name,
          job_company_location_country: profile.job_company_location_country,
          location_name: profile.location_name,
          location_country: profile.location_country,
          skills: profile.skills,
          summary: profile.summary,
          emails: profile.emails,
          inferred_salary: profile.inferred_salary,
          inferred_years_experience: profile.inferred_years_experience,
          linkedin_username: profile.linkedin_username,
          profiles_db_id: profile.id,
        },
      });
    } catch (error) {
      this.logger.error('Failed to index profile to ElasticSearch', error);
    }
  }

  async indexAllProfiles(): Promise<number> {
    const profiles = await this.profileRepo.find();
    let indexed = 0;
    for (const profile of profiles) {
      await this.indexProfile(profile);
      indexed++;
    }
    return indexed;
  }

  async searchWithElastic(query: QueryProfileDto) {
    const { keyword, skills, industry, job_title, location, company_size, page = 1, limit = 20 } = query;

    const must: QueryDslQueryContainer[] = [];
    const filter: QueryDslQueryContainer[] = [];

    if (keyword) {
      must.push({
        multi_match: {
          query: keyword,
          fields: ['full_name^3', 'job_title^2', 'job_company_name^2', 'industry', 'summary', 'skills'],
          type: 'best_fields',
          fuzziness: 'AUTO',
        },
      });
    }

    if (skills?.length) filter.push({ terms: { 'skills.keyword': skills } });
    if (industry?.length) filter.push({ terms: { 'industry.keyword': industry } });
    if (job_title?.length) filter.push({ terms: { 'job_title.keyword': job_title } });
    if (location?.length) {
      filter.push({
        bool: {
          should: [
            { terms: { 'location_name.keyword': location } },
            { terms: { location_country: location } },
            { terms: { job_company_location_country: location } },
          ],
        },
      });
    }
    if (company_size?.length) filter.push({ terms: { job_company_size: company_size } });

    try {
      const result = await elasticClient.search({
        index: PROFILE_INDEX,
        query: {
          bool: {
            must: must.length > 0 ? must : [{ match_all: {} }],
            filter,
          },
        },
        from: (page - 1) * limit,
        size: limit,
        highlight: { fields: { full_name: {}, job_title: {}, summary: {} } },
      });

      const total = typeof result.hits.total === 'object' ? result.hits.total.value : (result.hits.total as number);
      const ids = result.hits.hits.map((hit) => hit._id).filter(Boolean) as string[];

      let items: LinkedinProfile[] = [];
      if (ids.length > 0) {
        items = await this.profileRepo.findBy({ id: In(ids) });
      }

      return {
        data: items.map(ProfileMapper.toSearchResponse),
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
      };
    } catch (error) {
      this.logger.error('ElasticSearch query failed', error);
      return null;
    }
  }
}
