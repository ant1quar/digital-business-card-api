import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Achievement, Experience, Project, Skill } from '@prisma/client';
import { ExperienceRepository } from '../../experience/experience.repository';
import { ProjectRepository } from '../../project/project.repository';
import { SkillRepository } from '../../skill/skill.repository';

@Injectable({ scope: Scope.REQUEST })
export class DataloaderService {
  readonly skillsByProfileId: DataLoader<string, Skill[]>;
  readonly experienceByProfileId: DataLoader<string, Experience[]>;
  readonly projectsByProfileId: DataLoader<string, Project[]>;
  readonly achievementsByExperienceId: DataLoader<string, Achievement[]>;

  constructor(
    skillRepository: SkillRepository,
    experienceRepository: ExperienceRepository,
    projectRepository: ProjectRepository,
  ) {
    this.skillsByProfileId = new DataLoader(async (profileIds) => {
      const rows = await skillRepository.findByProfileIds(profileIds);
      return profileIds.map((id) => rows.filter((r) => r.profileId === id));
    });

    this.experienceByProfileId = new DataLoader(async (profileIds) => {
      const rows = await experienceRepository.findByProfileIds(profileIds);
      return profileIds.map((id) => rows.filter((r) => r.profileId === id));
    });

    this.projectsByProfileId = new DataLoader(async (profileIds) => {
      const rows = await projectRepository.findByProfileIds(profileIds);
      return profileIds.map((id) => rows.filter((r) => r.profileId === id));
    });

    this.achievementsByExperienceId = new DataLoader(async (experienceIds) => {
      const rows =
        await experienceRepository.findAchievementsByExperienceIds(experienceIds);
      return experienceIds.map((id) => rows.filter((r) => r.experienceId === id));
    });
  }
}
