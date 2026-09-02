import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('linkedin_profiles')
export class LinkedinProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  full_name: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  middle_name: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  middle_initial: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  gender: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  linkedin_url: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  @Index()
  linkedin_username: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  linkedin_id: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  facebook_url: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  facebook_username: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  facebook_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  industry: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  job_title: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  job_title_role: string;

  @Column({ type: 'simple-array', nullable: true })
  job_title_levels: string[];

  @Column({ type: 'varchar', length: 128, nullable: true })
  job_company_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  job_company_name: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  job_company_website: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  job_company_size: string;

  @Column({ type: 'int', nullable: true })
  job_company_founded: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  job_company_industry: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  job_company_linkedin_url: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  job_company_linkedin_id: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  job_company_facebook_url: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  job_company_twitter_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  job_company_location_name: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  job_company_location_locality: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  job_company_location_metro: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  job_company_location_region: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  job_company_location_country: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  job_company_location_continent: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  job_company_location_geo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  job_company_location_street_address: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  job_company_location_postal_code: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  job_company_location_address_line_2: string;

  @Column({ type: 'timestamp', nullable: true })
  job_last_updated: Date;

  @Column({ type: 'date', nullable: true })
  job_start_date: string;

  @Column({ type: 'text', nullable: true })
  job_summary: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index()
  location_name: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  location_locality: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  location_metro: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  location_region: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  @Index()
  location_country: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  location_continent: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  location_geo: string;

  @Column({ type: 'timestamp', nullable: true })
  location_last_updated: Date;

  @Column({ type: 'int', nullable: true })
  linkedin_connections: number;

  @Column({ type: 'varchar', length: 64, nullable: true })
  inferred_salary: string;

  @Column({ type: 'int', nullable: true })
  inferred_years_experience: number;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'simple-array', nullable: true })
  phone_numbers: string[];

  @Column({ type: 'simple-array', nullable: true })
  emails: string[];

  @Column({ type: 'simple-array', nullable: true })
  interests: string[];

  @Column({ type: 'simple-array', nullable: true })
  @Index()
  skills: string[];

  @Column({ type: 'simple-array', nullable: true })
  location_names: string[];

  @Column({ type: 'simple-array', nullable: true })
  regions: string[];

  @Column({ type: 'simple-array', nullable: true })
  countries: string[];

  @Column({ type: 'text', nullable: true })
  street_addresses: string;

  @Column({ type: 'jsonb', nullable: true })
  experience: Record<string, unknown>[];

  @Column({ type: 'jsonb', nullable: true })
  education: Record<string, unknown>[];

  @Column({ type: 'jsonb', nullable: true })
  profiles: Record<string, unknown>[];

  @Column({ type: 'jsonb', nullable: true })
  certifications: Record<string, unknown>[];

  @Column({ type: 'simple-array', nullable: true })
  languages: string[];

  @Column({ type: 'varchar', length: 32, nullable: true })
  version_status: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  work_email: string;

  @Column({ type: 'int', nullable: true })
  birth_year: number;

  @Column({ type: 'date', nullable: true })
  birth_date: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  twitter_url: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  twitter_username: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  github_url: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  github_username: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  mobile_phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location_street_address: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  location_postal_code: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location_address_line_2: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  job_title_sub_role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
