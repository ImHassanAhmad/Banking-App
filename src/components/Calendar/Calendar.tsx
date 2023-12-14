import { type FC } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { type CalendarProps } from './types';

const Calendar: FC<CalendarProps> = ({ name, label, register, errorValue }) => {
  const registerProps = register && name ? { ...register(name) } : {};
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label={label} {...registerProps} />
    </LocalizationProvider>
  );
};

export default Calendar;
