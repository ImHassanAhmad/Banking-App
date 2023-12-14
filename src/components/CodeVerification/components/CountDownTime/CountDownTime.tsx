import React, { useEffect, useState } from 'react';
import { type CountDownTimeProps } from '../../types';
import { Typography } from '@mui/material';
import { padZeroStart } from '@app/utils/number';

const CountDownTime: React.FC<CountDownTimeProps> = ({ seconds = 59, countDownComplete }) => {
  const [duration, setDuration] = useState(seconds);

  useEffect(() => {
    let count = 0;
    const timer = setInterval(() => {
      const remaining = duration - ++count;
      setDuration(remaining);
      if (remaining === 0) {
        clearInterval(timer);
        countDownComplete();
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Typography display={'inline'} fontSize={'14px'}>
      00:{padZeroStart(duration)}
    </Typography>
  );
};

export default CountDownTime;
