import React, { type FC } from 'react';
import { Button, CircularProgress } from '@mui/material';

import { type LoadingButtonProps } from './types';

const LoadingButton: FC<LoadingButtonProps> = ({
  title,
  isLoading,
  isDisabled,
  type,
  handleClick,
  sx
}) => {
  return (
    <Button
      fullWidth
      sx={sx}
      onClick={handleClick}
      type={type}
      disabled={isLoading || isDisabled}
      endIcon={isLoading && <CircularProgress />}>
      {isLoading ? '' : title}
    </Button>
  );
};

export default LoadingButton;
