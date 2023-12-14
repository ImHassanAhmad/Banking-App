import { IconButton, Typography } from '@mui/material';
import { type FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { type StyledIconButtonProps } from './types';

const StyledIconButton: FC<StyledIconButtonProps> = ({ symbol, font = 600 }) => {
  const theme = useTheme();
  return (
    <IconButton sx={{ backgroundColor: theme.palette.primary.main, p: 0, px: 1.5 }}>
      <Typography
        sx={{
          fontWeight: font
        }}>
        {symbol}
      </Typography>
    </IconButton>
  );
};

export default StyledIconButton;
