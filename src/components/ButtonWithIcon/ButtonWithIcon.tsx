import { Button, Box } from '@mui/material';
import { type FC } from 'react';
import { type ButtonWithIconProps } from './types';

const ButtonWithIcon: FC<ButtonWithIconProps> = ({
  title,
  icon,
  handleClick,
  iconType = 'start',
  variant = 'contained',
  sx,
  ...rest
}) => {
  return (
    <Button
      onClick={handleClick}
      sx={{
        height: 44,
        borderRadius: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        ...(sx && { ...sx })
      }}
      variant={variant}
      startIcon={iconType === 'start' && <Box component="img" src={icon} alt="button-icon" />}
      endIcon={iconType === 'end' && <Box component="img" src={icon} alt="button-icon" />}
      {...rest}>
      {title}
    </Button>
  );
};

export default ButtonWithIcon;
