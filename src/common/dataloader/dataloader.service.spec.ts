import { ExperienceRepository } from '../../experience/experience.repository';
import { ProjectRepository } from '../../project/project.repository';
import { SkillRepository } from '../../skill/skill.repository';
import { DataloaderService } from './dataloader.service';

describe('DataloaderService', () => {
  it('batches skills by profile id in one repository call', async () => {
    const findByProfileIds = jest.fn().mockResolvedValue([
      { id: '1', profileId: 'p1', name: 'TypeScript', category: 'FRONTEND' },
      {
        id: '2',
        profileId: 'p2',
        name: 'NestJS',
        category: 'BACKEND_INFRASTRUCTURE',
      },
    ]);
    const skillRepository = {
      findByProfileIds,
    } as unknown as SkillRepository;

    const experienceRepository = {
      findByProfileIds: jest.fn().mockResolvedValue([]),
      findAchievementsByExperienceIds: jest.fn().mockResolvedValue([]),
    } as unknown as ExperienceRepository;

    const projectRepository = {
      findByProfileIds: jest.fn().mockResolvedValue([]),
    } as unknown as ProjectRepository;

    const loaders = new DataloaderService(
      skillRepository,
      experienceRepository,
      projectRepository,
    );

    const [a, b] = await Promise.all([
      loaders.skillsByProfileId.load('p1'),
      loaders.skillsByProfileId.load('p2'),
    ]);

    expect(findByProfileIds).toHaveBeenCalledTimes(1);
    expect(a).toHaveLength(1);
    expect(b).toHaveLength(1);
  });
});
