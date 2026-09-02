import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinkedinProfile } from './profile.entity';
import { QueryProfileDto } from './dto/query-profile.dto';
import { ProfileMapper } from './mappers/profile.mapper';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(LinkedinProfile)
    private readonly profileRepo: Repository<LinkedinProfile>,
  ) {}

  async findAll(query: QueryProfileDto) {
    const { page = 1, limit = 20, sort = 'createdAt', order = 'DESC' } = query;

    const qb = this.profileRepo.createQueryBuilder('p');

    const [items, total] = await qb
      .orderBy(`p."${sort}"`, order as 'ASC' | 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: items.map(ProfileMapper.toListResponse),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const profile = await this.profileRepo.findOne({ where: { id } });
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return ProfileMapper.toResponse(profile);
  }

  async search(query: QueryProfileDto) {
    const {
      keyword,
      skills,
      industry,
      job_title,
      location,
      company_size,
      page = 1,
      limit = 20,
      sort = 'createdAt',
      order = 'DESC',
    } = query;

    const qb = this.profileRepo.createQueryBuilder('p');

    if (keyword) {
      qb.andWhere(
        `(p.full_name ILIKE :kw OR p.job_title ILIKE :kw OR p.job_company_name ILIKE :kw OR p.summary ILIKE :kw OR p.industry ILIKE :kw)`,
        { kw: `%${keyword}%` },
      );
    }

    if (skills && skills.length > 0) {
      qb.andWhere('p.skills && ARRAY[:...skills]', { skills });
    }

    if (industry && industry.length > 0) {
      qb.andWhere('p.industry IN (:...industry)', { industry });
    }

    if (job_title && job_title.length > 0) {
      qb.andWhere('p.job_title IN (:...job_title)', { job_title });
    }

    if (location && location.length > 0) {
      qb.andWhere(
        '(p.location_name IN (:...location) OR p.location_country IN (:...location) OR p.location_locality IN (:...location))',
        { location },
      );
    }

    if (company_size && company_size.length > 0) {
      qb.andWhere('p.job_company_size IN (:...company_size)', { company_size });
    }

    const [items, total] = await qb
      .orderBy(`p."${sort}"`, order as 'ASC' | 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: items.map(ProfileMapper.toSearchResponse),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getFilterOptions() {
    let skills: { skill: string }[] = [];
    try {
      skills = await this.profileRepo.query(
        `SELECT DISTINCT unnest(skills) as skill FROM linkedin_profiles WHERE skills IS NOT NULL`,
      );
    } catch {
      skills = [];
    }

    const industries = await this.profileRepo
      .createQueryBuilder('p')
      .select('DISTINCT p.industry', 'industry')
      .where('p.industry IS NOT NULL')
      .getRawMany();

    const jobTitles = await this.profileRepo
      .createQueryBuilder('p')
      .select('DISTINCT p.job_title', 'job_title')
      .where('p.job_title IS NOT NULL')
      .getRawMany();

    const locations = await this.profileRepo
      .createQueryBuilder('p')
      .select('DISTINCT p.location_country', 'location')
      .where('p.location_country IS NOT NULL')
      .getRawMany();

    const companySizes = await this.profileRepo
      .createQueryBuilder('p')
      .select('DISTINCT p.job_company_size', 'size')
      .where('p.job_company_size IS NOT NULL')
      .getRawMany();

    return {
      skills: skills.map((s) => s.skill).filter(Boolean),
      industries: industries.map((i) => i.industry).filter(Boolean),
      jobTitles: jobTitles.map((j) => j.job_title).filter(Boolean),
      locations: locations.map((l) => l.location).filter(Boolean),
      companySizes: companySizes.map((c) => c.size).filter(Boolean),
    };
  }

  async importProfiles(data: Partial<LinkedinProfile>[]): Promise<number> {
    let imported = 0;
    for (const item of data) {
      try {
        const entity = this.profileRepo.create(item);
        await this.profileRepo.save(entity);
        imported++;
      } catch (err) {
        console.error('Failed to import:', err);
      }
    }
    return imported;
  }
}
