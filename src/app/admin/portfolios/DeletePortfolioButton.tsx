'use client';

import { deletePortfolio } from './actions';

export function DeletePortfolioButton({ id }: { id: string }) {
  return (
    <form action={deletePortfolio} className="mt-6 max-w-2xl">
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm('Delete this portfolio?')) e.preventDefault();
        }}
        className="px-4 py-2 border border-red-300 text-red-700 rounded font-medium hover:bg-red-50"
      >
        Delete portfolio
      </button>
    </form>
  );
}
