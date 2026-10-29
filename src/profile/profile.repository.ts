import { Injectable } from '@nestjs/common';
import { Profile as ProfileEntity } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SEED_PROFILE_ID } from '../database/seed-data';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  findCardProfile(): Promise<ProfileEntity | null> {
    return this.prisma.profile.findUnique({ where: { id: SEED_PROFILE_ID } });
  }
}
