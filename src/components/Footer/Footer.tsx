import { Stack, Typography, Box } from '@mui/material';
import { type FC } from 'react';

const Footer: FC = () => {
  return (
    <Box
      sx={{
        p: 1,
        pl: 0,
        position: 'absolute',
        bottom: 0
      }}>
      <Stack direction="row" alignItems="center" gap={2} sx={{ cursor: 'pointer' }}>
        <Typography sx={{ fontSize: '1.4rem', fontWeight: 450, opacity: '50%' }}>
          W1TTY Global Ltd., is a regulated electronic money institution in the United Kingdom,
          licensed by the Financial Conduct Authority, license number 932839.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
