'use client';

import { RepeaterField } from './RepeaterField';
import { RichTextEditor } from './RichTextEditor';

type KeyFeaturesRepeaterFieldProps = {
  name: string;
  label: string;
  initialValues: string[];
};

export function KeyFeaturesRepeaterField({ name, label, initialValues }: KeyFeaturesRepeaterFieldProps) {
  return (
    <RepeaterField
      name={name}
      label={label}
      initialValues={initialValues}
      renderItem={({ value, onChange, index }) => (
        <RichTextEditor
          name={name}
          value={value}
          onChange={onChange}
          idSuffix={String(index)}
          placeholder="e.g. Feature: description (use toolbar for bold, italic, list, link)"
        />
      )}
    />
  );
}
