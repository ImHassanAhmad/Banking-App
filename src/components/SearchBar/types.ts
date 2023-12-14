import type React from 'react';

export interface SearchBarProps {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  iconPosition?: string;
  sx?: any;
}
