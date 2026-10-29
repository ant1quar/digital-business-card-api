import { Injectable } from '@nestjs/common';
import { Skill } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SkillRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByProfileIds(profileIds: readonly string[]): Promise<Skill[]> {
    return this.prisma.skill.findMany({
      where: { profileId: { in: [...profileIds] } },
      orderBy: { sortOrder: 'asc' },
    });
  }
}
