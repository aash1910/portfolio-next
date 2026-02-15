'use client';

import { RepeaterField } from '../portfolios/RepeaterField';
import type { InfoItem } from '@/lib/settings';

function parseInfoItem(s: string): InfoItem {
  try {
    const o = JSON.parse(s || '{}');
    return { label: o.label ?? '', value: o.value ?? '' };
  } catch {
    return { label: '', value: '' };
  }
}

function stringify(o: InfoItem): string {
  return JSON.stringify(o);
}

type Props = {
  name: string;
  label: string;
  initialValues: InfoItem[];
};

export function InfoItemsRepeaterField({ name, label, initialValues }: Props) {
  const values = initialValues.map((v) => stringify(v));
  if (values.length === 0) values.push(stringify({ label: '', value: '' }));

  return (
    <RepeaterField
      name={name}
      label={label}
      initialValues={values}
      renderItem={({ value, onChange }) => {
        const item = parseInfoItem(value);
        return (
          <>
            <input type="hidden" name={name} value={stringify(item)} readOnly aria-hidden />
            <div className="flex gap-2">
              <input
                type="text"
                value={item.label}
                onChange={(e) => onChange(stringify({ ...item, label: e.target.value }))}
                placeholder="Label (e.g. Birthday)"
                className="w-36 border border-gray-300 rounded px-2 py-1.5"
              />
              <input
                type="text"
                value={item.value}
                onChange={(e) => onChange(stringify({ ...item, value: e.target.value }))}
                placeholder="Value"
                className="flex-1 border border-gray-300 rounded px-2 py-1.5"
              />
            </div>
          </>
        );
      }}
    />
  );
}
