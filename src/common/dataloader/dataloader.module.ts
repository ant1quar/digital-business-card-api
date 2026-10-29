import { Module } from '@nestjs/common';
import { ExperienceModule } from '../../experience/experience.module';
import { ProjectModule } from '../../project/project.module';
import { SkillModule } from '../../skill/skill.module';
import { DataloaderService } from './dataloader.service';

@Module({
  imports: [SkillModule, ExperienceModule, ProjectModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
