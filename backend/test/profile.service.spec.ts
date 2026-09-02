import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from '../src/modules/profile/profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LinkedinProfile } from '../src/modules/profile/profile.entity';
import { Repository } from 'typeorm';

describe('ProfileService', () => {
  let service: ProfileService;
  let repo: Repository<LinkedinProfile>;

  const mockRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    findAndCount: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    count: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: getRepositoryToken(LinkedinProfile),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    repo = module.get(getRepositoryToken(LinkedinProfile));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated results', async () => {
      mockRepo.findAndCount.mockResolvedValue([[], 0]);

      const result = await service.findAll({ page: 1, limit: 20 });

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect(result.meta).toHaveProperty('total');
      expect(result.meta).toHaveProperty('page');
    });
  });

  describe('findOne', () => {
    it('should return a profile by id', async () => {
      const mockProfile = { id: '1', full_name: 'Test' };
      mockRepo.findOne.mockResolvedValue(mockProfile);

      const result = await service.findOne('1');
      expect(result).toEqual(mockProfile);
    });

    it('should throw NotFoundException', async () => {
      mockRepo.findOne.mockResolvedValue(null);

      await expect(service.findOne('nonexistent')).rejects.toThrow();
    });
  });

  describe('getFilterOptions', () => {
    it('should return filter options', async () => {
      mockRepo.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
      });

      const result = await service.getFilterOptions();
      expect(result).toHaveProperty('skills');
      expect(result).toHaveProperty('industries');
    });
  });
});
