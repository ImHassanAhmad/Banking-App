import { type Control, type FieldError } from 'react-hook-form';

export interface CalendarProps {
  name: string;
  label: string;
  defaultValue?: string;
  handleChange?: (date: any) => void;
  errorValue?: FieldError | undefined;
  control: Control<any, any>;
}
