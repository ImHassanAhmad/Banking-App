import { AVATAR_ICON } from '@app/assets/images';
import { Stack, Box, Typography, Divider } from '@mui/material';
import { type FC } from 'react';

const Footer: FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 20
      }}>
      <Stack mt={3}>
        <Stack direction="row" gap={2} alignItems="center">
          <Box component="img" src={AVATAR_ICON} alt="avatar" />
          <Typography
            sx={{
              fontSize: '1.8rem',
              fontWeight: 500
            }}>
            Hi, Eric
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ mt: 3 }} />
      <Typography sx={{ fontSize: '1rem', fontWeight: 450, mt: 3 }}>
        W1TTY Global UAB is a licensed financial institution under the supervision of the Central
        Bank of Lithuania.
      </Typography>
    </Box>
  );
};

export default Footer;
