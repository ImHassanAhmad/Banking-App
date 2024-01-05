import { CircularProgress, Button } from '@mui/material';
import React from 'react';
import { type SubmitButtonProps } from './types';

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  disabled,
  isLoading,
  sx,
  type,
  endIcon,
  startIcon,
  onClick
}) => {
  return (
    <Button
      endIcon={endIcon}
      startIcon={startIcon}
      disabled={disabled}
      sx={{ textTransform: 'uppercase', ...sx }}
      fullWidth
      type={type ? 'button' : 'submit'}
      onClick={onClick}>
      {isLoading ? <CircularProgress size={30} /> : title}
    </Button>
  );
};

export default SubmitButton;
