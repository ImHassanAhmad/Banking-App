import { type FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { type ItemDetailsProps } from './types';

const ItemDetail: FC<ItemDetailsProps> = ({ title, value, key, pb }) => {
  return (
    <Stack pb={`${pb}rem`} key={key}>
      <Typography sx={{ fontSize: '1.6rem', fontWeight: 450, opacity: 0.6 }}>{title}</Typography>
      <Typography sx={{ fontSize: '1.6rem', fontWeight: 450 }}>{value}</Typography>
    </Stack>
  );
};

export default ItemDetail;
