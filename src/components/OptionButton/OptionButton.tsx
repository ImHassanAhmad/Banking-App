import React, { type FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface OptionButtonProps {
  icon: string;
  title?: string;
}

const OptionButton: FC<OptionButtonProps> = (props) => {
  const { icon, title } = props;
  const theme = useTheme();
  return (
    <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} gap={1}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          bgcolor: theme.palette.primary.main,
          borderRadius: '10px',
          minHeight: '40px',
          width: '40px',
          cursor: 'pointer'
        }}>
        {/* <Typography sx={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'black' }}>
          {icon}
        </Typography> */}
        <img src={icon} alt="send icon" />
      </Box>
      {title && <Typography sx={{ fontSize: '1.4rem', fontWeight: 500 }}>{title}</Typography>}
    </Stack>
  );
};

export default OptionButton;
