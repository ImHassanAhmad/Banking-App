import { type FC } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { type CalendarProps } from './types';
import { Controller } from 'react-hook-form';

const Calendar: FC<CalendarProps> = ({ name, control, label, handleChange }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={label}
              onChange={(date) => {
                field.onChange(date);
                handleChange?.(date);
              }}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
        );
      }}></Controller>
  );
};

export default Calendar;
