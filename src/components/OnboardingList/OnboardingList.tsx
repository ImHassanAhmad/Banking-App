// ItemCategories.tsx
import React from 'react';
import { Box, IconButton, List, ListItem, Stack, Typography } from '@mui/material';
import Heading from '@app/components/Heading';
import { ArrowRightIcon } from '@mui/x-date-pickers';
import { type OnboardingListProps } from './types';

const OnboardingList: React.FC<OnboardingListProps> = ({
  itemList,
  onItemClick,
  title,
  subtitle
}) => {
  return (
    <Stack>
      <Stack mt={4}>
        <Heading title={title} subTitle={subtitle} />
      </Stack>
      <List sx={{ marginTop: '1rem' }}>
        {itemList.map(({ topic, details }) => (
          <ListItem
            key={topic}
            sx={{
              borderRadius: '12px',
              margin: '0.5rem 0',
              '&:hover': { backgroundColor: '#F2F2F2' },
              color: 'black',
              cursor: 'pointer',
              padding: '15px 20px'
            }}
            onClick={() => {
              onItemClick(topic);
            }}>
            <Box>
              <Typography variant="subtitle1">{topic}</Typography>
              {details ? <Typography variant="subtitle2">{details}</Typography> : ''}
            </Box>
            <IconButton
              sx={{ ml: 'auto' }}
              onClick={() => {
                onItemClick(topic);
              }}>
              <ArrowRightIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default OnboardingList;
