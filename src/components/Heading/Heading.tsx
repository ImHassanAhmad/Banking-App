import { type FC } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { type HeadingProps } from './types';

const Heading: FC<HeadingProps> = ({ title, subTitle, subTitleAnchor, subTitleAnchorClick }) => {
  return (
    <Stack>
      <Typography
        sx={{
          fontSize: '3.6rem',
          fontWeight: 530
        }}>
        {title}
      </Typography>
      <Box>
        <Typography
          sx={{
            fontSize: '1.8rem',
            fontWeight: 450,
            opacity: '70%',
            display: 'inline'
          }}>
          {subTitle}{' '}
        </Typography>
        {subTitleAnchor && (
          <Typography
            sx={{
              display: 'inline',
              cursor: 'pointer',
              textDecorationLine: 'underline'
            }}
            onClick={subTitleAnchorClick}>
            {subTitleAnchor}
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

export default Heading;
