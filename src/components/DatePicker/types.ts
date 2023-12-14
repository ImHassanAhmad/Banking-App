export type DatePickerField = Date | null;
export type MinDateField = Date | undefined;
export interface DatePickerProps {
  title: string;
  minDate?: MinDateField;
  onChange: (date: DatePickerField) => void;
}
