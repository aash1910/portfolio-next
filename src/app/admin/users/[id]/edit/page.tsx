import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { updateUser } from '../../actions';
import { DeleteUserButton } from '@/app/admin/users/DeleteUserButton';

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true },
  });
  if (!user) notFound();

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/users" className="text-gray-600 hover:text-gray-900 text-sm">
          ← Users
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Edit user</h1>
      </div>
      <form action={updateUser} className="max-w-md space-y-4 bg-white p-6 rounded-lg border border-gray-200">
        <input type="hidden" name="id" value={user.id} />
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input id="email" name="email" type="email" defaultValue={user.email} required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New password (leave blank to keep current)</label>
          <input id="password" name="password" type="password" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="••••••••" />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input id="name" name="name" type="text" defaultValue={user.name ?? ''} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input id="role" name="role" type="text" defaultValue={user.role} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700">
            Save
          </button>
          <Link href="/admin/users" className="px-4 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </Link>
        </div>
      </form>
      <DeleteUserButton id={user.id} />
    </div>
  );
}
