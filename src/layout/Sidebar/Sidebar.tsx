import { type FC } from 'react';
import { W1TTY_LOGO } from '@app/assets/images';
import { Box, Stack } from '@mui/material';
import Footer from './components/Footer';

const Sidebar: FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: '33rem',
        overflowY: 'auto',
        py: 2,
        px: 4,
        boxSizing: 'border-box'
      }}>
      <Stack>
        <Stack sx={{ ml: 2, my: 3, mb: 7 }}>
          <Box
            component="img"
            src={W1TTY_LOGO}
            alt="home"
            sx={{
              width: 100
            }}
          />
        </Stack>
      </Stack>

      <Footer />
    </Box>
  );
};

export default Sidebar;
