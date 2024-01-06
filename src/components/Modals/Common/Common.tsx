import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { CommonProps } from '../types';
import { Stack } from '@mui/material';
import { INFO_ICON } from '@app/assets/images';

const Common: React.FC<CommonProps> = ({ title, subtitle }) => {
  return (
    <Stack gap={2}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Box
          component={'img'}
          src={INFO_ICON}
          alt="info icon"
          sx={{ width: '4.5rem', height: '4.5rem' }}
        />
      </Stack>
      <Typography
        id="transition-modal-title"
        sx={{
          fontSize: '2.8rem',
          lineHeight: '2.8rem',
          fontWeight: 500
        }}>
        {title}
      </Typography>

      <Typography
        id="transition-modal-description"
        sx={{
          fontSize: '1.8rem',
          fontWeight: 450,
          opacity: '70%',
          display: 'inline'
        }}>
        {subtitle}
      </Typography>
    </Stack>
  );
};

export default Common;
