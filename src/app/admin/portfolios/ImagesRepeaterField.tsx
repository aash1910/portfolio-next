'use client';

import { RepeaterField } from './RepeaterField';
import { ThumbnailField } from './ThumbnailField';

type ImagesRepeaterFieldProps = {
  name: string;
  label: string;
  initialValues: string[];
  /** Optional folder under assets/portfolio (e.g. project id) for uploads */
  folder?: string;
};

export function ImagesRepeaterField({ name, label, initialValues, folder }: ImagesRepeaterFieldProps) {
  return (
    <RepeaterField
      name={name}
      label={label}
      initialValues={initialValues}
      renderItem={({ value, onChange, index }) => (
        <ThumbnailField
          name={name}
          value={value}
          onChange={onChange}
          folder={folder}
          label=""
          idSuffix={String(index)}
        />
      )}
    />
  );
}
