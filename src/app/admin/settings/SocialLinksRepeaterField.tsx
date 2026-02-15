'use client';

import { RepeaterField } from '../portfolios/RepeaterField';
import type { SocialLink } from '@/lib/settings';

function parseSocialLink(s: string): SocialLink {
  try {
    const o = JSON.parse(s || '{}');
    return { url: o.url ?? '', icon: o.icon ?? 'link' };
  } catch {
    return { url: '', icon: 'link' };
  }
}

function stringify(o: SocialLink): string {
  return JSON.stringify(o);
}

const ICON_OPTIONS = ['github', 'facebook', 'linkedin', 'twitter', 'instagram', 'youtube', 'link'];

type Props = {
  name: string;
  label: string;
  initialValues: SocialLink[];
};

export function SocialLinksRepeaterField({ name, label, initialValues }: Props) {
  const values = initialValues.map((v) => stringify(v));
  if (values.length === 0) values.push(stringify({ url: '', icon: 'link' }));

  return (
    <RepeaterField
      name={name}
      label={label}
      initialValues={values}
      renderItem={({ value, onChange }) => {
        const item = parseSocialLink(value);
        return (
          <>
            <input type="hidden" name={name} value={stringify(item)} readOnly aria-hidden />
            <div className="flex gap-2 flex-wrap">
              <input
                type="url"
                value={item.url}
                onChange={(e) => onChange(stringify({ ...item, url: e.target.value }))}
                placeholder="URL"
                className="flex-1 min-w-[200px] border border-gray-300 rounded px-3 py-2"
              />
              <select
                value={item.icon}
                onChange={(e) => onChange(stringify({ ...item, icon: e.target.value }))}
                className="border border-gray-300 rounded px-3 py-2 bg-white w-32"
              >
                {ICON_OPTIONS.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </>
        );
      }}
    />
  );
}
