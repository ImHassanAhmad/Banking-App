import { type FC } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { type CalendarProps } from './types';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';

const Calendar: FC<CalendarProps> = ({ name, control, label, defaultValue, handleChange }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={label}
              defaultValue={defaultValue ? dayjs(defaultValue) : null}
              onChange={(date) => {
                field.onChange(date);
                handleChange?.(date);
              }}
              format="DD.MM.YYYY"
            />
          </LocalizationProvider>
        );
      }}></Controller>
  );
};

export default Calendar;
