import { type FieldError } from 'react-hook-form';

export interface CalendarProps {
  name: string;
  label: string;
  handleChange?: (date: any) => void;
  errorValue?: FieldError | undefined;
}
