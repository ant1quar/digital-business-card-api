import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SEED_PROFILE_ID } from '../database/seed-data';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  const repository = {
    findCardProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService, { provide: ProfileRepository, useValue: repository }],
    }).compile();

    service = module.get(ProfileService);
    jest.clearAllMocks();
  });

  it('maps profile with contact links', async () => {
    repository.findCardProfile.mockResolvedValue({
      id: SEED_PROFILE_ID,
      name: 'Ivan Krivonos',
      description: 'Summary',
      location: 'Cascais (Lisbon area), Portugal',
      email: 'krivonos.ivann@gmail.com',
      githubUrl: 'https://github.com/ant1quar',
      linkedInUrl: 'https://www.linkedin.com/in/ivan-ai-frontend',
    });

    const profile = await service.getProfile();

    expect(profile.name).toBe('Ivan Krivonos');
    expect(profile.links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: 'GitHub' }),
        expect.objectContaining({ label: 'LinkedIn' }),
        expect.objectContaining({ label: 'Email' }),
      ]),
    );
  });

  it('throws when profile is missing', async () => {
    repository.findCardProfile.mockResolvedValue(null);
    await expect(service.getProfile()).rejects.toBeInstanceOf(NotFoundException);
  });
});
