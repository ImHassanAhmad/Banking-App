import { type FC } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { type CalendarProps } from './types';
import dayjs from 'dayjs';

const Calendar: FC<CalendarProps> = ({ label, defaultValue, handleChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        onChange={handleChange}
        defaultValue={defaultValue ? dayjs(defaultValue) : null}
        format="DD.MM.YYYY"
      />
    </LocalizationProvider>
  );
};

export default Calendar;
