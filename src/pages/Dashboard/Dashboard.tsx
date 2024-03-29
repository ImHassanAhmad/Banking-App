import Heading from '@app/components/Heading';
import TabTitle from '@app/components/TabTitle';
import { Stack } from '@mui/material';
import { type FC } from 'react';

const Dashboard: FC = () => {
  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <Stack mt={5}>
        <TabTitle title="Dasboard" />
        <Heading title={'Dashboard'} subTitle={''} />
      </Stack>
    </Stack>
  );
};

export default Dashboard;
