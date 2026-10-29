import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from './models/profile.model';
import { mapProfile } from './profile.mapper';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async getProfile(): Promise<Profile> {
    const entity = await this.profileRepository.findCardProfile();
    if (!entity) {
      throw new NotFoundException('Profile not seeded yet');
    }
    return mapProfile(entity);
  }
}
