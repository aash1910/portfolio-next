'use client';

import { useState } from 'react';

type RepeaterFieldProps = {
  name: string;
  label: string;
  initialValues: string[];
  placeholder?: string;
};

export function RepeaterField({ name, label, initialValues, placeholder = 'Item' }: RepeaterFieldProps) {
  const [items, setItems] = useState<string[]>(initialValues.length > 0 ? initialValues : ['']);

  const add = () => setItems((prev) => [...prev, '']);
  const remove = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index));
  const update = (index: number, value: string) =>
    setItems((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  const moveUp = (index: number) => {
    if (index <= 0) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };
  const moveDown = (index: number) => {
    if (index >= items.length - 1) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <button
          type="button"
          onClick={add}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          + Add item
        </button>
      </div>
      <div className="space-y-2">
        {items.map((value, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="hidden"
              name={name}
              value={value}
              readOnly
              aria-hidden
            />
            <input
              type="text"
              value={value}
              onChange={(e) => update(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                type="button"
                onClick={() => moveUp(index)}
                disabled={index === 0}
                title="Move up"
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
              </button>
              <button
                type="button"
                onClick={() => moveDown(index)}
                disabled={index === items.length - 1}
                title="Move down"
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                title="Remove"
                className="p-2 text-red-500 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
