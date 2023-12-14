import { CircularProgress, Stack } from '@mui/material';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginLeft: '12%',
        marginTop: '2%',
        position: 'absolute',
        left: '50%',
        // top: '30%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100
      }}>
      <CircularProgress />
    </Stack>
  );
};

export default Loader;
