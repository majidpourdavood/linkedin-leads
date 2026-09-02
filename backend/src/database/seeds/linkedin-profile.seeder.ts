import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinkedinProfile } from '../../modules/profile/profile.entity';

@Injectable()
export class LinkedinProfileSeeder {
  constructor(
    @InjectRepository(LinkedinProfile)
    private readonly repo: Repository<LinkedinProfile>,
  ) {}

  async seed(): Promise<void> {
    const count = await this.repo.count();
    if (count > 0) {
      console.log(`[Seeder] ${count} profiles exist. Skipping.`);
      return;
    }

    console.log('[Seeder] Creating 300 sample profiles...');

    const firstNames = [
      'Ali', 'Mohammad', 'Reza', 'Mahdi', 'Hossein', 'Amir', 'Saeed', 'Mehran',
      'Navid', 'Pejman', 'Arash', 'Dariush', 'Kaveh', 'Shahriar', 'Babak',
      'Sara', 'Maryam', 'Zahra', 'Fatimah', 'Nasrin', 'Parisa', 'Leila',
      'John', 'James', 'Robert', 'Michael', 'David', 'William', 'Richard',
      'Sarah', 'Jennifer', 'Linda', 'Elizabeth', 'Jessica', 'Emily', 'Anna',
    ];

    const lastNames = [
      'Ahmadi', 'Hosseini', 'Rahimi', 'Moradi', 'Mohammadi', 'Karami',
      'Fallahi', 'Karimi', 'Hashemi', 'Jafari', 'Mousavi', 'Zarei',
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia',
      'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Anderson', 'Taylor',
    ];

    const jobTitles = [
      'Software Engineer', 'Senior Software Engineer', 'Full Stack Developer',
      'Frontend Developer', 'Backend Developer', 'DevOps Engineer',
      'Data Scientist', 'Data Engineer', 'Machine Learning Engineer',
      'Product Manager', 'Project Manager', 'UX Designer', 'UI Designer',
      'Business Analyst', 'Marketing Manager', 'CTO', 'CEO', 'Technical Lead',
    ];

    const companies = [
      'Snapp', 'Digikala', 'CafeBazaar', 'Google', 'Microsoft', 'Amazon',
      'Apple', 'Meta', 'Netflix', 'Spotify', 'Uber', 'Airbnb',
      'Samsung', 'Intel', 'IBM', 'Oracle', 'Salesforce', 'Adobe',
    ];

    const industries = [
      'Information Technology', 'Software Development', 'Computer Software',
      'Internet', 'E-Commerce', 'Financial Services', 'Healthcare', 'Education',
    ];

    const countries = ['Iran', 'United States', 'Canada', 'Germany', 'United Kingdom'];
    const cities = ['Tehran', 'Isfahan', 'Shiraz', 'San Francisco', 'New York', 'Seattle', 'Toronto', 'Berlin', 'London'];

    const skillsPool = [
      'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Node.js', 'Express', 'NestJS',
      'Python', 'Django', 'Java', 'Spring Boot', 'Go', 'Rust', 'C#', '.NET',
      'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'ElasticSearch',
      'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Git', 'Linux',
    ];

    const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    const pickN = <T>(arr: T[], min: number, max: number): T[] => {
      const n = Math.floor(Math.random() * (max - min + 1)) + min;
      return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
    };
    const genId = (): string => Math.random().toString(36).substring(2, 15);

    for (let i = 0; i < 300; i++) {
      const fn = pick(firstNames);
      const ln = pick(lastNames);
      const company = pick(companies);
      const country = pick(countries);
      const city = pick(cities);
      const username = `${fn.toLowerCase()}.${ln.toLowerCase()}${Math.floor(Math.random() * 100)}`;

      const entity = this.repo.create({
        full_name: `${fn} ${ln}`,
        first_name: fn,
        last_name: ln,
        gender: Math.random() > 0.4 ? 'male' : 'female',
        linkedin_url: `https://linkedin.com/in/${username}`,
        linkedin_username: username,
        linkedin_id: genId(),
        industry: pick(industries),
        job_title: pick(jobTitles),
        job_company_name: company,
        job_company_size: pick(['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']),
        job_company_location_country: country,
        location_name: city,
        location_country: country,
        skills: pickN(skillsPool, 3, 8),
        summary: 'Passionate software engineer with expertise in building scalable web applications.',
        emails: [`${fn.toLowerCase()}.${ln.toLowerCase()}@gmail.com`],
        inferred_years_experience: Math.floor(Math.random() * 15) + 1,
      });

      await this.repo.save(entity);
    }

    console.log('[Seeder] Done: 300 profiles created.');
  }
}
