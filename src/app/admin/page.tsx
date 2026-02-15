import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/portfolios"
          className="block p-4 rounded-lg bg-white border border-gray-200 hover:border-blue-500 hover:shadow"
        >
          <h2 className="font-medium text-gray-900">Portfolios</h2>
          <p className="text-sm text-gray-500 mt-1">Manage portfolio projects</p>
        </Link>
        <Link
          href="/admin/users"
          className="block p-4 rounded-lg bg-white border border-gray-200 hover:border-blue-500 hover:shadow"
        >
          <h2 className="font-medium text-gray-900">Users</h2>
          <p className="text-sm text-gray-500 mt-1">Manage admin users</p>
        </Link>
        <Link
          href="/admin/settings"
          className="block p-4 rounded-lg bg-white border border-gray-200 hover:border-blue-500 hover:shadow"
        >
          <h2 className="font-medium text-gray-900">Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Header, About, Resume sections</p>
        </Link>
      </div>
    </div>
  );
}
