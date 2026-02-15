'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function ensureAuth() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');
  return session;
}

export async function createUser(formData: FormData) {
  await ensureAuth();
  const email = (formData.get('email') as string).trim().toLowerCase();
  const password = formData.get('password') as string;
  const name = (formData.get('name') as string)?.trim() || null;
  const role = (formData.get('role') as string)?.trim() || 'admin';
  if (!email || !password) throw new Error('Email and password are required');
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { email, passwordHash, name, role },
  });
  revalidatePath('/admin/users');
  redirect('/admin/users');
}

export async function updateUser(formData: FormData) {
  await ensureAuth();
  const id = formData.get('id') as string;
  if (!id) throw new Error('Invalid user ID');
  const email = (formData.get('email') as string).trim().toLowerCase();
  const name = (formData.get('name') as string)?.trim() || null;
  const role = (formData.get('role') as string)?.trim() || 'admin';
  const password = formData.get('password') as string;
  const data: { email: string; name: string | null; role: string; passwordHash?: string } = {
    email,
    name,
    role,
  };
  if (password && password.length > 0) {
    data.passwordHash = await bcrypt.hash(password, 10);
  }
  await prisma.user.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/users');
  redirect('/admin/users');
}

export async function deleteUser(formData: FormData) {
  await ensureAuth();
  const id = formData.get('id') as string;
  if (!id) throw new Error('Invalid user ID');
  await prisma.user.delete({ where: { id } });
  revalidatePath('/admin/users');
  redirect('/admin/users');
}
