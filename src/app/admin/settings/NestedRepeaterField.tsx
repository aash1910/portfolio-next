'use client';

import { useState, useEffect } from 'react';

/** Controlled repeater for string arrays - no form inputs. Use inside another RepeaterField when data is embedded in parent JSON. */
type NestedRepeaterFieldProps = {
  label?: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

export function NestedRepeaterField({
  label = 'Items',
  value,
  onChange,
  placeholder = 'Item',
}: NestedRepeaterFieldProps) {
  const [items, setItems] = useState<string[]>(value.length > 0 ? value : ['']);

  useEffect(() => {
    setItems(value.length > 0 ? value : ['']);
  }, [value]);

  const syncToParent = (next: string[]) => {
    setItems(next);
    onChange(next);
  };

  const add = () => syncToParent([...items, '']);
  const remove = (index: number) => syncToParent(items.filter((_, i) => i !== index));
  const update = (index: number, val: string) => {
    const next = [...items];
    next[index] = val;
    syncToParent(next);
  };
  const moveUp = (index: number) => {
    if (index <= 0) return;
    const next = [...items];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    syncToParent(next);
  };
  const moveDown = (index: number) => {
    if (index >= items.length - 1) return;
    const next = [...items];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    syncToParent(next);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        {label ? (
          <label className="block text-sm font-medium text-gray-600">{label}</label>
        ) : null}
        <button
          type="button"
          onClick={add}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          + Add
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((val, index) => (
          <div key={index} className="flex gap-2 items-start">
            <input
              type="text"
              value={val}
              onChange={(e) => update(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 min-w-0 border border-gray-300 rounded px-2 py-1.5 text-sm"
            />
            <div className="flex items-center gap-0.5 shrink-0 pt-1">
              <button
                type="button"
                onClick={() => moveUp(index)}
                disabled={index === 0}
                title="Move up"
                className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
              </button>
              <button
                type="button"
                onClick={() => moveDown(index)}
                disabled={index === items.length - 1}
                title="Move down"
                className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                title="Remove"
                className="p-1.5 text-red-500 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
