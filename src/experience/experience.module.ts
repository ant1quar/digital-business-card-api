import { Module } from '@nestjs/common';
import { ExperienceRepository } from './experience.repository';

@Module({
  providers: [ExperienceRepository],
  exports: [ExperienceRepository],
})
export class ExperienceModule {}
