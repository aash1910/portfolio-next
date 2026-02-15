'use client';

import { RepeaterField } from '../portfolios/RepeaterField';
import type { EducationItem } from '@/lib/settings';

function parseItem(s: string): EducationItem {
  try {
    const o = JSON.parse(s || '{}');
    return {
      title: o.title ?? '',
      year: o.year ?? '',
      institution: o.institution ?? '',
      description: o.description ?? '',
    };
  } catch {
    return { title: '', year: '', institution: '', description: '' };
  }
}

function stringify(o: EducationItem): string {
  return JSON.stringify(o);
}

type Props = {
  name: string;
  label: string;
  initialValues: EducationItem[];
};

export function EducationRepeaterField({ name, label, initialValues }: Props) {
  const values = initialValues.map((v) => stringify(v));
  if (values.length === 0) values.push(stringify({ title: '', year: '', institution: '', description: '' }));

  return (
    <RepeaterField
      name={name}
      label={label}
      initialValues={values}
      renderItem={({ value, onChange }) => {
        const item = parseItem(value);
        return (
          <>
            <input type="hidden" name={name} value={stringify(item)} readOnly aria-hidden />
            <div className="flex flex-col gap-2 border border-gray-200 rounded p-3 bg-gray-50">
              <input
                type="text"
                value={item.title}
                onChange={(e) => onChange(stringify({ ...item, title: e.target.value }))}
                placeholder="Degree / Title"
                className="w-full border border-gray-300 rounded px-2 py-1.5"
              />
              <input
                type="text"
                value={item.year}
                onChange={(e) => onChange(stringify({ ...item, year: e.target.value }))}
                placeholder="Year (e.g. Passed in 2010)"
                className="w-full border border-gray-300 rounded px-2 py-1.5"
              />
              <input
                type="text"
                value={item.institution}
                onChange={(e) => onChange(stringify({ ...item, institution: e.target.value }))}
                placeholder="Institution"
                className="w-full border border-gray-300 rounded px-2 py-1.5"
              />
              <input
                type="text"
                value={item.description}
                onChange={(e) => onChange(stringify({ ...item, description: e.target.value }))}
                placeholder="Description (e.g. CGPA)"
                className="w-full border border-gray-300 rounded px-2 py-1.5"
              />
            </div>
          </>
        );
      }}
    />
  );
}
