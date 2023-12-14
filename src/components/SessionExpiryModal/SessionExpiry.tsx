import { ButtonBase, Dialog, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useIdleTimerContext } from 'react-idle-timer';
import { useTranslation } from 'react-i18next';
import { RouteNames } from '@app/constants/routes';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type

const namespace = RouteNames.HELP;
const SessionExpiry: React.FC<{ isOpen: boolean }> = ({ isOpen }: { isOpen: boolean }) => {
  const { activate, getRemainingTime } = useIdleTimerContext();
  const [time, setTime] = useState<number>(0);
  const { t } = useTranslation();
  const totalTime = 4;
  useEffect(() => {
    const timer: ReturnType<typeof setInterval> = setInterval(() => {
      setTime(Math.ceil(getRemainingTime() / 1000));
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, [time]);
  console.log(time);
  return (
    <>
      <Dialog open={isOpen} sx={{ width: '420px', margin: '0 auto' }}>
        <Box sx={{ padding: '32px 32px 24px 32px' }}>
          <Box>
            <Typography sx={{ fontSize: '36px' }}>
              {time > 0 &&
                `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(
                  2,
                  '0'
                )}`}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={((totalTime - time) / totalTime) * 100}
              sx={{
                marginTop: '8px',
                width: '280px',
                borderRadius: '10px',
                background: ' var(--on-background-tertiary, #6C6C6C)',
                '& .css-nmbpgy-MuiLinearProgress-bar1': {
                  background: 'black'
                }
              }}></LinearProgress>
          </Box>
          <Box sx={{ padding: '18px 0px 18px 0px' }}>
            <Typography
              sx={{
                color: ' var(--on-background-primary, #000)',
                fontSize: '27px',
                fontWeight: '500px',
                lineHeight: '1',
                letterSpacing: '0px'
              }}>
              {t(`${namespace}.session_expiry_heading`)}
            </Typography>
            <Typography
              sx={{
                fontSize: '17px',
                fontWeight: '450px'
              }}>
              {t(`${namespace}.session_expiry_body`)}
            </Typography>
          </Box>
          <Typography
            sx={{
              padding: '16px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              background: 'var(--Primary, #BAFF2A)'
            }}>
            <ButtonBase
              onClick={activate}
              sx={{
                fontSize: '18px'
              }}>
              {t(`${namespace}.session_active_btn`)}
            </ButtonBase>
          </Typography>
          <Typography
            sx={{
              display: 'flex',
              padding: '16px',
              justifyContent: 'center'
            }}>
            <ButtonBase>{t(`${namespace}.logout_btn`)}</ButtonBase>
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};
export default SessionExpiry;
