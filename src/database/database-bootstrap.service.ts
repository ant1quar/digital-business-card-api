import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { execSync } from 'node:child_process';
import { PrismaService } from '../prisma/prisma.service';
import { seedDatabase } from './seed-data';

@Injectable()
export class DatabaseBootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseBootstrapService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap(): Promise<void> {
    this.runMigrations();
    await seedDatabase(this.prisma);
    this.logger.log('Database migrations applied and seed completed.');
  }

  private runMigrations(): void {
    this.logger.log('Applying Prisma migrations…');
    execSync('npx prisma migrate deploy', {
      stdio: 'inherit',
      env: process.env,
    });
  }
}
