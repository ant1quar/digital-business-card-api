import { Module } from '@nestjs/common';
import { DataloaderModule } from '../common/dataloader/dataloader.module';
import { ProfileRepository } from './profile.repository';
import { ExperienceResolver } from '../experience/experience.resolver';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  imports: [DataloaderModule],
  providers: [ProfileRepository, ProfileService, ProfileResolver, ExperienceResolver],
})
export class ProfileModule {}
