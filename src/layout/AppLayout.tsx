import React, { type PropsWithChildren } from 'react';
import Footer from '@app/components/Footer';
import { Grid, Stack } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={11} sm={10} md={6} xl={6} position="relative" sx={{ minHeight: '100vh' }}>
        <Stack justifyContent="flex-start">
          <Header />
        </Stack>
        <Stack mb={12}>{!children ? <Outlet /> : children}</Stack>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default AppLayout;
