import { type RenderResult } from '@testing-library/react';

export interface TermCheckListProps {
  checked: boolean;
  link?: string;
  optional?: boolean;
}

export type TermCheckListType = Record<string, TermCheckListProps>;

export interface TermLabelProps {
  link?: string;
  linkText: string;
}

export interface TermItemProps extends TermLabelProps {
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
