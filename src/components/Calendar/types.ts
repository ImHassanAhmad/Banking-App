import { type UseFormRegister, type FieldError } from 'react-hook-form';

export interface CalendarProps {
  name: string;
  label: string;
  errorValue?: FieldError | undefined;
  register?: UseFormRegister<any>;
}
