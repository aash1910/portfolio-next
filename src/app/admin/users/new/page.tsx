import Link from 'next/link';
import { createUser } from '../actions';

export default function NewUserPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/users" className="text-gray-600 hover:text-gray-900 text-sm">
          ← Users
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">New user</h1>
      </div>
      <form action={createUser} className="max-w-md space-y-4 bg-white p-6 rounded-lg border border-gray-200">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input id="email" name="email" type="email" required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input id="password" name="password" type="password" required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input id="name" name="name" type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input id="role" name="role" type="text" defaultValue="admin" className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700">
            Create
          </button>
          <Link href="/admin/users" className="px-4 py-2 border border-gray-300 rounded font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
