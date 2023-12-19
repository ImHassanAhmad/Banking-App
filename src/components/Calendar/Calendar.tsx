import { type FC } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { type CalendarProps } from './types';

const Calendar: FC<CalendarProps> = ({ label, handleChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label={label} onChange={handleChange} format="DD/MM/YYYY" />
    </LocalizationProvider>
  );
};

export default Calendar;
