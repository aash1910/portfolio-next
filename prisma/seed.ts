import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { portfolioProjects } from '../src/data/portfolio';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      passwordHash,
      name: 'Admin',
      role: 'admin',
    },
  });

  for (const p of portfolioProjects) {
    await prisma.portfolioProject.upsert({
      where: { id: p.id },
      update: {
        title: p.title,
        shortDescription: p.shortDescription,
        category: p.category,
        filter: p.filter,
        thumbnail: p.thumbnail,
        images: p.images as unknown as object,
        projectDate: p.projectDate,
        demoUrl: p.demoUrl ?? null,
        demoCredentials: p.demoCredentials ?? null,
        androidAppUrl: p.androidAppUrl ?? null,
        iosAppUrl: p.iosAppUrl ?? null,
        techStack: p.techStack,
        overview: p.overview,
        keyFeatures: p.keyFeatures as unknown as object,
        challenges: p.challenges as unknown as object,
        achievements: p.achievements as unknown as object,
      },
      create: {
        id: p.id,
        title: p.title,
        shortDescription: p.shortDescription,
        category: p.category,
        filter: p.filter,
        thumbnail: p.thumbnail,
        images: p.images as unknown as object,
        projectDate: p.projectDate,
        demoUrl: p.demoUrl ?? null,
        demoCredentials: p.demoCredentials ?? null,
        androidAppUrl: p.androidAppUrl ?? null,
        iosAppUrl: p.iosAppUrl ?? null,
        techStack: p.techStack,
        overview: p.overview,
        keyFeatures: p.keyFeatures as unknown as object,
        challenges: p.challenges as unknown as object,
        achievements: p.achievements as unknown as object,
      },
    });
  }
}

main()
  .then(() => {
    console.log('Seed completed.');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
