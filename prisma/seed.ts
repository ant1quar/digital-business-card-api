import { PrismaClient } from '@prisma/client';
import { seedDatabase } from '../src/database/seed-data';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await seedDatabase(prisma);
  console.log('Seed completed (idempotent).');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
