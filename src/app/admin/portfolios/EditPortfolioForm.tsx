'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { updatePortfolio } from './actions';

type Props = { children: React.ReactNode };

export function EditPortfolioForm({ children }: Props) {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const result = await updatePortfolio(formData);
      if (result?.success) {
        toast.success('Portfolio saved successfully');
        router.push('/admin/portfolios');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save portfolio');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 bg-white p-6 rounded-lg border border-gray-200">
      {children}
    </form>
  );
}
