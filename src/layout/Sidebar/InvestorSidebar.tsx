import { type FC } from 'react';
import {
  ACCOUNTS_ICON,
  HOME_ICON,
  W1TTY_LOGO,
  GLOBAL_ICON,
  MORE_ICON,
  UNION_ICON
} from '@app/assets/images';
import { Box, Stack } from '@mui/material';
import Footer from './components/Footer';
import SidebarItem from './components/SidebarItem';
import { RouteNames } from '@app/constants/routes';
import { useLocation } from 'react-router-dom';

const InvestorSidebar: FC = () => {
  const { pathname } = useLocation();

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
      <SidebarItem
        icon={HOME_ICON}
        title="Home"
        route={RouteNames.DASHBOARD}
        active={pathname === `/${RouteNames.DASHBOARD}`}
      />
      <SidebarItem
        icon={ACCOUNTS_ICON}
        title="Manage Assets"
        route={RouteNames.MANAGE_ASSETS}
        active={pathname === `/${RouteNames.MANAGE_ASSETS}`}
      />
      <SidebarItem
        icon={GLOBAL_ICON}
        title="Primary Market"
        route={RouteNames.MANAGE_ASSETS}
        active={false && pathname === `/${RouteNames.MANAGE_ASSETS}`}
      />
      <SidebarItem
        icon={UNION_ICON}
        title="Secondary Market"
        route={RouteNames.MANAGE_ASSETS}
        active={false && pathname === `/${RouteNames.MANAGE_ASSETS}`}
      />
      <SidebarItem
        icon={MORE_ICON}
        title="Manage Wallet"
        route={RouteNames.MANAGE_ASSETS}
        active={false && pathname === `/${RouteNames.MANAGE_ASSETS}`}
      />
      <Footer />
    </Box>
  );
};

export default InvestorSidebar;
