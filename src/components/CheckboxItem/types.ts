import { type RenderResult } from '@testing-library/react';

export interface AllowActionItem {
  allowAction?: boolean;
}

export interface CheckListProps extends AllowActionItem {
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
  isDisabled?: boolean;
}

export type SetupResult = RenderResult & {
  clickCheckboxByLabel: (labelText: string) => void;
};

export interface CheckIconProps {
  icon: string;
}
