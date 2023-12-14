import React, { type FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import { type SidebarItemProps } from '../../types';

const SidebarItem: FC<SidebarItemProps> = ({ icon, title, route, active }) => {
  const theme = useTheme();
  return (
    <Link to={route} style={{ textDecoration: 'none' }}>
      <Box
        p={2}
        sx={{
          ...(active && { backgroundColor: theme.palette.common.white, borderRadius: '0.8rem' })
        }}>
        <Stack direction="row" alignItems="center" gap={2}>
          <Box sx={{ minWidth: '10%' }}>
            <Box component="img" src={icon} alt="home" />
          </Box>
          <Typography
            sx={{
              fontSize: '1.7rem'
            }}>
            {title}
          </Typography>
        </Stack>
      </Box>
    </Link>
  );
};

export default SidebarItem;
