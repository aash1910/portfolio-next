'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type {
  HeaderSettings,
  AboutSettings,
  ResumeSettings,
  SocialLink,
  NavLink,
  InfoItem,
  EducationItem,
  ExperienceItem,
} from '@/lib/settings';

async function ensureAuth() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');
  return session;
}

function parseJsonArray<T>(formData: FormData, name: string, parse: (s: string) => T): T[] {
  const items = formData.getAll(name);
  if (!items.length) return [];
  return items
    .map((s) => {
      try {
        return parse(String(s).trim());
      } catch {
        return null;
      }
    })
    .filter((v): v is T => v != null);
}

function parseSocialLinks(formData: FormData): SocialLink[] {
  return parseJsonArray(formData, 'socialLinks', (s) => {
    const o = JSON.parse(s);
    return { url: String(o.url ?? '').trim(), icon: String(o.icon ?? 'link').trim() };
  }).filter((x) => x.url);
}

function parseNavLinks(formData: FormData): NavLink[] {
  return parseJsonArray(formData, 'navLinks', (s) => {
    const o = JSON.parse(s);
    return {
      label: String(o.label ?? '').trim(),
      href: String(o.href ?? '').trim(),
      icon: String(o.icon ?? '').trim(),
    };
  }).filter((x) => x.label && x.href);
}

function parseInfoItems(formData: FormData): InfoItem[] {
  return parseJsonArray(formData, 'infoItems', (s) => {
    const o = JSON.parse(s);
    return { label: String(o.label ?? '').trim(), value: String(o.value ?? '').trim() };
  }).filter((x) => x.label || x.value);
}

function parseEducation(formData: FormData): EducationItem[] {
  return parseJsonArray(formData, 'education', (s) => {
    const o = JSON.parse(s);
    return {
      title: String(o.title ?? '').trim(),
      year: String(o.year ?? '').trim(),
      institution: String(o.institution ?? '').trim(),
      description: String(o.description ?? '').trim(),
    };
  }).filter((x) => x.title || x.institution);
}

function parseExperience(formData: FormData): ExperienceItem[] {
  return parseJsonArray(formData, 'experience', (s) => {
    const o = JSON.parse(s);
    return {
      title: String(o.title ?? '').trim(),
      dates: String(o.dates ?? '').trim(),
      company: String(o.company ?? '').trim(),
      bullets: Array.isArray(o.bullets)
        ? o.bullets.map((b: unknown) => String(b ?? '').trim()).filter(Boolean)
        : [],
    };
  }).filter((x) => x.title || x.company);
}

function parseSummaryContactInfo(formData: FormData): string[] {
  const items = formData.getAll('summaryContactInfo');
  return items.map((s) => String(s).trim()).filter(Boolean);
}

export async function updateSiteSettings(formData: FormData) {
  await ensureAuth();

  const header: HeaderSettings = {
    siteName: (formData.get('siteName') as string)?.trim() ?? '',
    profileImage: (formData.get('headerProfileImage') as string)?.trim() ?? '',
    socialLinks: parseSocialLinks(formData),
    navLinks: parseNavLinks(formData),
  };

  const about: AboutSettings = {
    sectionTitle: (formData.get('aboutSectionTitle') as string)?.trim() ?? 'About',
    introParagraph: (formData.get('introParagraph') as string)?.trim() ?? '',
    profileImage: (formData.get('aboutProfileImage') as string)?.trim() ?? '',
    fullName: (formData.get('fullName') as string)?.trim() ?? '',
    bioParagraph: (formData.get('bioParagraph') as string)?.trim() ?? '',
    infoItems: parseInfoItems(formData),
    bottomParagraph: (formData.get('bottomParagraph') as string)?.trim() ?? '',
  };

  const resume: ResumeSettings = {
    sectionTitle: (formData.get('resumeSectionTitle') as string)?.trim() ?? 'Resume',
    summaryName: (formData.get('summaryName') as string)?.trim() ?? '',
    summaryDescription: (formData.get('summaryDescription') as string)?.trim() ?? '',
    summaryContactInfo: parseSummaryContactInfo(formData),
    education: parseEducation(formData),
    experience: parseExperience(formData),
  };

  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    create: {
      id: 'default',
      data: { header, about, resume },
    },
    update: {
      data: { header, about, resume },
    },
  });

  revalidatePath('/');
  revalidatePath('/admin/settings');
  return { success: true };
}
