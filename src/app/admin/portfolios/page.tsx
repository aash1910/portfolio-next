import Link from 'next/link';
import { getProjects } from '@/lib/portfolio';

export default async function AdminPortfoliosPage() {
  const projects = await getProjects();
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Portfolios</h1>
        <Link
          href="/admin/portfolios/new"
          className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700"
        >
          Add portfolio
        </Link>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">ID</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Title</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Category</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Date</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{p.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{p.title}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{p.category}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{p.projectDate}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/portfolios/${p.id}/edit`}
                    className="text-blue-600 hover:underline text-sm mr-4"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/portfolio/${p.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:underline text-sm"
                  >
                    View
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
