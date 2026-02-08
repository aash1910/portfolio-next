'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function ensureAuth() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');
  return session;
}

function parseLines(s: string): string[] {
  return s
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function createPortfolio(formData: FormData) {
  await ensureAuth();
  const id = (formData.get('id') as string).trim().toLowerCase().replace(/\s+/g, '-');
  if (!id) throw new Error('ID is required');
  const title = (formData.get('title') as string).trim();
  const shortDescription = (formData.get('shortDescription') as string).trim();
  const category = (formData.get('category') as string).trim();
  const filter = (formData.get('filter') as string).trim() || 'filter-product';
  const thumbnail = (formData.get('thumbnail') as string).trim();
  const projectDate = (formData.get('projectDate') as string).trim();
  const techStack = (formData.get('techStack') as string).trim();
  const overview = (formData.get('overview') as string).trim();
  const images = parseLines((formData.get('images') as string) || '');
  const keyFeatures = parseLines((formData.get('keyFeatures') as string) || '');
  const challenges = parseLines((formData.get('challenges') as string) || '');
  const achievements = parseLines((formData.get('achievements') as string) || '');
  const demoUrl = (formData.get('demoUrl') as string)?.trim() || null;
  const demoCredentials = (formData.get('demoCredentials') as string)?.trim() || null;
  const androidAppUrl = (formData.get('androidAppUrl') as string)?.trim() || null;
  const iosAppUrl = (formData.get('iosAppUrl') as string)?.trim() || null;

  await prisma.portfolioProject.create({
    data: {
      id,
      title,
      shortDescription,
      category,
      filter,
      thumbnail: thumbnail || '/assets/placeholder.png',
      projectDate,
      demoUrl,
      demoCredentials,
      androidAppUrl,
      iosAppUrl,
      techStack,
      overview,
      images,
      keyFeatures,
      challenges,
      achievements,
    },
  });
  revalidatePath('/');
  revalidatePath('/admin/portfolios');
  redirect('/admin/portfolios');
}

export async function updatePortfolio(formData: FormData) {
  await ensureAuth();
  const id = (formData.get('id') as string)?.trim();
  if (!id) throw new Error('ID is required');
  const title = (formData.get('title') as string).trim();
  const shortDescription = (formData.get('shortDescription') as string).trim();
  const category = (formData.get('category') as string).trim();
  const filter = (formData.get('filter') as string).trim() || 'filter-product';
  const thumbnail = (formData.get('thumbnail') as string).trim();
  const projectDate = (formData.get('projectDate') as string).trim();
  const techStack = (formData.get('techStack') as string).trim();
  const overview = (formData.get('overview') as string).trim();
  const images = parseLines((formData.get('images') as string) || '');
  const keyFeatures = parseLines((formData.get('keyFeatures') as string) || '');
  const challenges = parseLines((formData.get('challenges') as string) || '');
  const achievements = parseLines((formData.get('achievements') as string) || '');
  const demoUrl = (formData.get('demoUrl') as string)?.trim() || null;
  const demoCredentials = (formData.get('demoCredentials') as string)?.trim() || null;
  const androidAppUrl = (formData.get('androidAppUrl') as string)?.trim() || null;
  const iosAppUrl = (formData.get('iosAppUrl') as string)?.trim() || null;

  await prisma.portfolioProject.update({
    where: { id },
    data: {
      title,
      shortDescription,
      category,
      filter,
      thumbnail: thumbnail || '/assets/placeholder.png',
      projectDate,
      demoUrl,
      demoCredentials,
      androidAppUrl,
      iosAppUrl,
      techStack,
      overview,
      images,
      keyFeatures,
      challenges,
      achievements,
    },
  });
  revalidatePath('/');
  revalidatePath('/admin/portfolios');
  revalidatePath(`/portfolio/${id}`);
  redirect('/admin/portfolios');
}

export async function deletePortfolio(formData: FormData) {
  await ensureAuth();
  const id = (formData.get('id') as string)?.trim();
  if (!id) throw new Error('ID is required');
  await prisma.portfolioProject.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/portfolios');
  redirect('/admin/portfolios');
}
