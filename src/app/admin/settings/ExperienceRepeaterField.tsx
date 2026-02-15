'use client';

import { RepeaterField } from '../portfolios/RepeaterField';
import { NestedRepeaterField } from './NestedRepeaterField';
import type { ExperienceItem } from '@/lib/settings';

function parseItem(s: string): ExperienceItem {
  try {
    const o = JSON.parse(s || '{}');
    return {
      title: o.title ?? '',
      dates: o.dates ?? '',
      company: o.company ?? '',
      bullets: Array.isArray(o.bullets) ? o.bullets : [],
    };
  } catch {
    return { title: '', dates: '', company: '', bullets: [] };
  }
}

function stringify(o: ExperienceItem): string {
  return JSON.stringify(o);
}

type Props = {
  name: string;
  label: string;
  initialValues: ExperienceItem[];
};

export function ExperienceRepeaterField({ name, label, initialValues }: Props) {
  const values = initialValues.map((v) => stringify(v));
  if (values.length === 0) values.push(stringify({ title: '', dates: '', company: '', bullets: [] }));

  return (
    <RepeaterField
      name={name}
      label={label}
      initialValues={values}
      renderItem={({ value, onChange }) => {
        const item = parseItem(value);
        const setBullets = (bullets: string[]) =>
          onChange(stringify({ ...item, bullets }));

        return (
          <>
            <input type="hidden" name={name} value={stringify(item)} readOnly aria-hidden />
            <div className="flex flex-col gap-2 border border-gray-200 rounded p-3 bg-gray-50">
              <input
                type="text"
                value={item.title}
                onChange={(e) => onChange(stringify({ ...item, title: e.target.value }))}
                placeholder="Job title"
                className="w-full border border-gray-300 rounded px-2 py-1.5"
              />
              <input
                type="text"
                value={item.dates}
                onChange={(e) => onChange(stringify({ ...item, dates: e.target.value }))}
                placeholder="Dates (e.g. 2025 - Present)"
                className="w-full border border-gray-300 rounded px-2 py-1.5"
              />
              <input
                type="text"
                value={item.company}
                onChange={(e) => onChange(stringify({ ...item, company: e.target.value }))}
                placeholder="Company"
                className="w-full border border-gray-300 rounded px-2 py-1.5"
              />
              <NestedRepeaterField
                label="Bullet points"
                value={item.bullets}
                onChange={setBullets}
                placeholder="e.g. Led development of..."
              />
            </div>
          </>
        );
      }}
    />
  );
}
