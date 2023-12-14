import React, { type FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface CurrencySymbolProps {
  symbol: string;
}

const CurrencySymbol: FC<CurrencySymbolProps> = (props) => {
  const { symbol } = props;
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        bgcolor: theme.palette.primary.main,
        borderRadius: '10px',
        minHeight: '100%',
        minWidth: '100%',
        cursor: 'pointer'
      }}>
      <Typography sx={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'black' }}>
        {symbol}
      </Typography>
    </Box>
  );
};

export default CurrencySymbol;
