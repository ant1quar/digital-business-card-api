import { ResolveField, Resolver, Root } from '@nestjs/graphql';
import { DataloaderService } from '../common/dataloader/dataloader.service';
import { Achievement } from './models/achievement.model';
import { Experience } from './models/experience.model';

@Resolver(() => Experience)
export class ExperienceResolver {
  constructor(private readonly dataloaders: DataloaderService) {}

  @ResolveField(() => [Achievement])
  async achievements(@Root() experience: Experience): Promise<Achievement[]> {
    const rows = await this.dataloaders.achievementsByExperienceId.load(experience.id);
    return rows.map((row) => ({ id: row.id, text: row.text }));
  }
}
