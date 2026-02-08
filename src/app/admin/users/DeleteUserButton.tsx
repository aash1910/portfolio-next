'use client';

import { deleteUser } from './actions';

export function DeleteUserButton({ id }: { id: number }) {
  return (
    <form action={deleteUser} className="mt-6 max-w-md">
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm('Delete this user?')) e.preventDefault();
        }}
        className="px-4 py-2 border border-red-300 text-red-700 rounded font-medium hover:bg-red-50"
      >
        Delete user
      </button>
    </form>
  );
}
