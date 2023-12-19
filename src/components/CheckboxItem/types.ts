import { type RenderResult } from '@testing-library/react';

export interface CheckListProps {
  checked: boolean;
  link?: string;
  optional?: boolean;
}

export type CheckListType = Record<string, CheckListProps>;

export interface CheckboxLabelProps {
  link?: string;
  linkText: string;
}

export interface CheckboxItemProps extends CheckboxLabelProps {
  optional?: boolean;
  checked: boolean;
  onChange: () => void;
}

export type SetupResult = RenderResult & {
  clickCheckboxByLabel: (labelText: string) => void;
};

export interface CheckIconProps {
  icon: string;
}
