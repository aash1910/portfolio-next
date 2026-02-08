import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
        <Link
          href="/admin/users/new"
          className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700"
        >
          Add user
        </Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Role</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Created</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{u.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{u.name ?? '—'}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{u.role}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/users/${u.id}/edit`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
