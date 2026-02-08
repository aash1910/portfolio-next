import { prisma } from '@/lib/prisma';

export interface PortfolioProjectDTO {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  filter: string;
  thumbnail: string;
  images: string[];
  projectDate: string;
  demoUrl?: string | null;
  demoCredentials?: string | null;
  androidAppUrl?: string | null;
  iosAppUrl?: string | null;
  techStack: string;
  overview: string;
  keyFeatures: string[];
  challenges: string[];
  achievements: string[];
}

function mapProject(
  p: {
    id: string;
    title: string;
    shortDescription: string;
    category: string;
    filter: string;
    thumbnail: string;
    images: unknown;
    projectDate: string;
    demoUrl: string | null;
    demoCredentials: string | null;
    androidAppUrl: string | null;
    iosAppUrl: string | null;
    techStack: string;
    overview: string;
    keyFeatures: unknown;
    challenges: unknown;
    achievements: unknown;
  }
): PortfolioProjectDTO {
  return {
    id: p.id,
    title: p.title,
    shortDescription: p.shortDescription,
    category: p.category,
    filter: p.filter,
    thumbnail: p.thumbnail,
    images: Array.isArray(p.images) ? (p.images as string[]) : [],
    projectDate: p.projectDate,
    demoUrl: p.demoUrl ?? undefined,
    demoCredentials: p.demoCredentials ?? undefined,
    androidAppUrl: p.androidAppUrl ?? undefined,
    iosAppUrl: p.iosAppUrl ?? undefined,
    techStack: p.techStack,
    overview: p.overview,
    keyFeatures: Array.isArray(p.keyFeatures) ? (p.keyFeatures as string[]) : [],
    challenges: Array.isArray(p.challenges) ? (p.challenges as string[]) : [],
    achievements: Array.isArray(p.achievements) ? (p.achievements as string[]) : [],
  };
}

export async function getProjects(): Promise<PortfolioProjectDTO[]> {
  const list = await prisma.portfolioProject.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return list.map(mapProject);
}

export async function getProjectById(id: string): Promise<PortfolioProjectDTO | null> {
  const p = await prisma.portfolioProject.findUnique({
    where: { id },
  });
  return p ? mapProject(p) : null;
}

export async function getAllProjectIds(): Promise<string[]> {
  const list = await prisma.portfolioProject.findMany({
    select: { id: true },
  });
  return list.map((x) => x.id);
}
