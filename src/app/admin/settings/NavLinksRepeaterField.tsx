'use client';

import { RepeaterField } from '../portfolios/RepeaterField';
import type { NavLink } from '@/lib/settings';

function parseNavLink(s: string): NavLink {
  try {
    const o = JSON.parse(s || '{}');
    return { label: o.label ?? '', href: o.href ?? '', icon: o.icon ?? '' };
  } catch {
    return { label: '', href: '', icon: '' };
  }
}

function stringify(o: NavLink): string {
  return JSON.stringify(o);
}

const ICON_OPTIONS = ['', 'person', 'file-earmark-text', 'images', 'briefcase', 'envelope', 'house'];

type Props = {
  name: string;
  label: string;
  initialValues: NavLink[];
};

export function NavLinksRepeaterField({ name, label, initialValues }: Props) {
  const values = initialValues.map((v) => stringify(v));
  if (values.length === 0) values.push(stringify({ label: '', href: '', icon: '' }));

  return (
    <RepeaterField
      name={name}
      label={label}
      initialValues={values}
      renderItem={({ value, onChange }) => {
        const item = parseNavLink(value);
        return (
          <>
            <input type="hidden" name={name} value={stringify(item)} readOnly aria-hidden />
            <div className="flex gap-2 flex-wrap items-center">
              <input
                type="text"
                value={item.label}
                onChange={(e) => onChange(stringify({ ...item, label: e.target.value }))}
                placeholder="Label"
                className="w-28 border border-gray-300 rounded px-2 py-1.5"
              />
              <input
                type="text"
                value={item.href}
                onChange={(e) => onChange(stringify({ ...item, href: e.target.value }))}
                placeholder="href (e.g. /#about)"
                className="flex-1 min-w-[150px] border border-gray-300 rounded px-2 py-1.5"
              />
              <select
                value={item.icon}
                onChange={(e) => onChange(stringify({ ...item, icon: e.target.value }))}
                className="border border-gray-300 rounded px-2 py-1.5 bg-white w-40"
              >
                {ICON_OPTIONS.map((i) => (
                  <option key={i} value={i}>
                    {i || '(no icon)'}
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
