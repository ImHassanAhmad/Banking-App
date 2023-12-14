import React from 'react';
import { type WarningAlertProps } from './types';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { CROSS_ERROR_ICON } from '@app/assets/images';

const style = {
  padding: '16px',
  borderRadius: '12px',
  gap: '12px',
  backgroundColor: 'rgba(237, 114, 93, 0.1)'
};

const WarningAlert: React.FC<WarningAlertProps> = ({ message }) => {
  const theme = useTheme();
  return (
    <>
      <Stack style={style} direction={'row'} alignItems={'center'}>
        <Box>
          <img src={CROSS_ERROR_ICON} />
        </Box>
        <Typography
          sx={{
            color: theme.palette.error.light,
            fontSize: '1.4rem',
            fontWeight: 530,
            lineHeight: '1.8rem'
          }}>
          {message}
        </Typography>
      </Stack>
    </>
  );
};

export default WarningAlert;
