'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { mkdir, writeFile, unlink } from 'fs/promises';
import path from 'path';
import type { Dirent } from 'fs';

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

function parseChallenges(formData: FormData): string[] {
  const getAll = formData.getAll('challenges');
  if (getAll.length > 0) {
    return getAll.map((s) => String(s).trim()).filter(Boolean);
  }
  return parseLines((formData.get('challenges') as string) || '');
}

function parseAchievements(formData: FormData): string[] {
  const getAll = formData.getAll('achievements');
  if (getAll.length > 0) {
    return getAll.map((s) => String(s).trim()).filter(Boolean);
  }
  return parseLines((formData.get('achievements') as string) || '');
}

function parseKeyFeatures(formData: FormData): string[] {
  const getAll = formData.getAll('keyFeatures');
  if (getAll.length > 0) {
    return getAll.map((s) => String(s).trim()).filter(Boolean);
  }
  return parseLines((formData.get('keyFeatures') as string) || '');
}

function parseImages(formData: FormData): string[] {
  const getAll = formData.getAll('images');
  if (getAll.length > 0) {
    return getAll.map((s) => String(s).trim()).filter(Boolean);
  }
  return parseLines((formData.get('images') as string) || '');
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
  const images = parseImages(formData);
  const keyFeatures = parseKeyFeatures(formData);
  const challenges = parseChallenges(formData);
  const achievements = parseAchievements(formData);
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
      thumbnail: thumbnail || '',
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
  const images = parseImages(formData);
  const keyFeatures = parseKeyFeatures(formData);
  const challenges = parseChallenges(formData);
  const achievements = parseAchievements(formData);
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
      thumbnail: thumbnail || '',
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

const PORTFOLIO_ASSETS_DIR = 'public/assets/portfolio';
const ALLOWED_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp']);

/** Returns a unique filename: timestamp + original extension (e.g. 1771080976508.png). */
function timestampFileName(originalName: string): string {
  const ext = path.extname(originalName || 'image.png').toLowerCase();
  const safeExt = ALLOWED_EXT.has(ext) ? ext : '.png';
  return `${Date.now()}${safeExt}`;
}

/** Uploads a thumbnail file to public/assets/portfolio/[folder]/ and returns the public path. */
export async function uploadThumbnailToLocal(formData: FormData): Promise<{ path?: string; error?: string }> {
  await ensureAuth();
  const file = formData.get('file') as File | null;
  if (!file || typeof file.arrayBuffer !== 'function') {
    return { error: 'No file provided' };
  }
  const folder = (formData.get('folder') as string)?.trim() || 'uploads';
  const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '');
  const fileName = timestampFileName(file.name || 'image.png');
  const dir = path.join(process.cwd(), PORTFOLIO_ASSETS_DIR, safeFolder);
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);
  const publicPath = `/assets/portfolio/${safeFolder}/${fileName}`;
  return { path: publicPath };
}

/** Returns list of image paths under public/assets/portfolio for the library picker. */
export async function getLocalPortfolioImages(): Promise<{ paths: string[] }> {
  await ensureAuth();
  const { readdir } = await import('fs/promises');
  const root = path.join(process.cwd(), PORTFOLIO_ASSETS_DIR);
  const paths: string[] = [];

  async function walk(dir: string, baseUrl: string) {
    let entries: Dirent[];
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      const url = `${baseUrl}/${e.name}`;
      if (e.isDirectory()) {
        await walk(full, url);
      } else if (e.isFile() && ALLOWED_EXT.has(path.extname(e.name).toLowerCase())) {
        paths.push(url);
      }
    }
  }

  await walk(root, '/assets/portfolio');
  paths.sort();
  return { paths };
}

/** Returns top-level folder names under public/assets/portfolio for upload destination. */
export async function getLocalPortfolioFolders(): Promise<{ folders: string[] }> {
  await ensureAuth();
  const { readdir } = await import('fs/promises');
  const root = path.join(process.cwd(), PORTFOLIO_ASSETS_DIR);
  const folders: string[] = [];
  try {
    const entries = await readdir(root, { withFileTypes: true });
    for (const e of entries) {
      if (e.isDirectory()) folders.push(e.name);
    }
  } catch {
    // directory may not exist yet
  }
  folders.sort();
  return { folders };
}

/** Deletes an image file under public/assets/portfolio if not used by another thumbnail or images field. */
export async function deletePortfolioImage(imagePath: string): Promise<{ ok?: boolean; error?: string }> {
  await ensureAuth();
  const normalized = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  if (!normalized.startsWith('/assets/portfolio/')) {
    return { error: 'Invalid path' };
  }
  const filePath = path.join(process.cwd(), 'public', normalized);
  const projects = await prisma.portfolioProject.findMany({
    select: { thumbnail: true, images: true },
  });
  let usageCount = 0;
  for (const p of projects) {
    if (p.thumbnail === normalized) usageCount += 1;
    const imgs = Array.isArray(p.images) ? (p.images as string[]) : [];
    for (const img of imgs) {
      if (img === normalized) usageCount += 1;
    }
  }
  if (usageCount > 1) {
    return { error: 'Image is used in another thumbnail or images field and cannot be deleted.' };
  }
  try {
    await unlink(filePath);
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Failed to delete file' };
  }
}
