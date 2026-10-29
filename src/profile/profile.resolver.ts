import { Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { DataloaderService } from '../common/dataloader/dataloader.service';
import { SkillCategoryGql } from '../common/enums/skill-category.enum';
import { SkillLevelGql } from '../common/enums/skill-level.enum';
import { Experience } from '../experience/models/experience.model';
import { Project } from '../project/models/project.model';
import { Skill } from '../skill/models/skill.model';
import { Profile } from './models/profile.model';
import { ProfileService } from './profile.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly dataloaders: DataloaderService,
  ) {}

  @Query(() => Profile, { description: 'Digital business card profile' })
  profile(): Promise<Profile> {
    return this.profileService.getProfile();
  }

  @ResolveField(() => [Skill])
  async skills(@Root() profile: Profile): Promise<Skill[]> {
    const rows = await this.dataloaders.skillsByProfileId.load(profile.id);
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category as SkillCategoryGql,
      level: row.level as SkillLevelGql | null,
    }));
  }

  @ResolveField('experience', () => [Experience])
  async experience(@Root() profile: Profile): Promise<Experience[]> {
    const rows = await this.dataloaders.experienceByProfileId.load(profile.id);
    return rows.map((row) => ({
      id: row.id,
      company: row.company,
      position: row.position,
      period: row.periodLabel,
      subtitle: row.subtitle,
      achievements: [],
    }));
  }

  @ResolveField(() => [Project])
  async projects(@Root() profile: Profile): Promise<Project[]> {
    const rows = await this.dataloaders.projectsByProfileId.load(profile.id);
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      link: row.link,
    }));
  }
}
