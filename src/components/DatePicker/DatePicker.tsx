import React from 'react';
import { Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ARROW_DOWN } from '@app/assets/images';
import { DateTimePicker } from '@mui/x-date-pickers';
import { type DatePickerProps } from './types';

const styleTypography = {
  opacity: '72%'
};

const DatePicker: React.FC<DatePickerProps> = ({ title, minDate, onChange }: DatePickerProps) => {
  return (
    <>
      <Stack
        borderRadius={'10px'}
        bgcolor={'#EBEBEB'}
        height={'52px'}
        width={'100%'}
        direction={'row'}
        gap={2}>
        <Typography
          mt={'16px'}
          ml={'16px'}
          fontWeight={450}
          fontSize={'16px'}
          lineHeight={'20px'}
          letterSpacing={'2%'}
          borderRadius={'10px'}
          style={styleTypography}>
          {' '}
          {title}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            disableFuture={true}
            minDate={minDate}
            onChange={onChange}
            views={['day', 'month', 'year']}
            format={'DD.MM.YYYY'}
            slotProps={{
              // textField: {
              //   placeholder: 'Choose date'
              // },
              inputAdornment: {
                style: {
                  maxHeight: '52px'
                }
              }
            }}
            sx={{
              '.css-1vggfzk-MuiInputBase-root-MuiOutlinedInput-root': {
                height: '52px'
              }
            }}
            slots={{
              openPickerIcon: () => <img src={ARROW_DOWN} />
            }}
          />
        </LocalizationProvider>
      </Stack>
    </>
  );
};

export default DatePicker;
