import { getServerSession } from 'next-auth';
import { Toaster } from 'react-hot-toast';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <a href="/admin" className="font-semibold text-gray-800">
          Portfolio Admin
        </a>
        <div className="flex items-center gap-4">
          {session?.user?.email ? (
            <>
              <span className="text-sm text-gray-600">{session.user.email}</span>
              <a
                href="/api/auth/signout"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Sign out
              </a>
            </>
          ) : (
            <a
              href="/admin/login/"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Login
            </a>
          )}
        </div>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
