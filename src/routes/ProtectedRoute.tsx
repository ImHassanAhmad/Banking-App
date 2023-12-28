import SessionExpiry from '@app/components/SessionExpiryModal/SessionExpiry';
import IdleTimerWrapper from '@app/layout/IdleTimer/IdleTimerWrapper';
import Sidebar from '@app/layout/Sidebar';
import auth from '@app/utils/auth';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import type { IProtectedRouterProps } from './types';
import { useAppSelector } from '@app/store/hooks';
import { RouteNames } from '@app/constants/routes';
// import { useRefreshTokenMutation } from '@app/store/api/login';
const timeout = 10_000;
const promptBeforeIdle = 4_000;

const ProtectedRoute: React.FC<IProtectedRouterProps> = ({ redirectPath = '/login' }) => {
  const navigate = useNavigate();
  const { postOnboardingCompleted, email } = useAppSelector((state) => state.userData);

  useEffect(() => {
    if (email === '') {
      navigate('/login');
    } else if (!postOnboardingCompleted) {
      navigate(`/${RouteNames.POST_ONBOARDING}`);
    }
  }, [postOnboardingCompleted, email]);

  const [showSessionExpiry, setShowSessionExpiry] = useState<boolean>(false);
  // const [refresh, { isloading }] = useRefreshTokenMutation();
  const onIdle = (): void => {
    // auth.logout();
    setShowSessionExpiry(false);
  };

  const onPrompt = (): void => {
    // setShowSessionExpiry(true);
  };

  const onActive = (): void => {
    setShowSessionExpiry(false);
    auth.refreshToken();
    // refresh(token);
  };
  // const isLoggedIn = auth.accessToken() !== null;

  // if (!isLoggedIn) {
  //   return <Navigate to={redirectPath} replace />;
  // }

  return (
    <>
      <IdleTimerWrapper
        onIdle={onIdle}
        onPrompt={onPrompt}
        idleTime={timeout}
        promptTime={promptBeforeIdle}
        onActive={onActive}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '33rem 1fr' }}>
          <Box>
            <Sidebar />
          </Box>
          <Box px={6}>
            <Outlet />
          </Box>
        </Box>
        <SessionExpiry isOpen={showSessionExpiry} />
      </IdleTimerWrapper>
    </>
  );
};

export default ProtectedRoute;
