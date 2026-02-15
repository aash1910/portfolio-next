'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { updateSiteSettings } from './actions';

type Props = { children: React.ReactNode };

export function SettingsForm({ children }: Props) {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const result = await updateSiteSettings(formData);
      if (result?.success) {
        toast.success('Settings saved successfully');
        router.push('/admin');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save settings');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {children}
    </form>
  );
}
