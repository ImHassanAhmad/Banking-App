// ItemCategories.tsx
import React from 'react';
import { Box, List, ListItem, Stack, Typography } from '@mui/material';
import Heading from '@app/components/Heading';
import { ArrowRightIcon } from '@mui/x-date-pickers';
import { type ICategories, type OnboardingListProps } from './types';

const OnboardingList: React.FC<OnboardingListProps> = ({
  itemList,
  onItemClick,
  title,
  subtitle,
  defaultValue
}) => {
  return (
    <Stack>
      <Stack mt={5}>
        <Heading title={title} subTitle={subtitle} />
      </Stack>
      <List sx={{ marginTop: '1rem' }}>
        {itemList.map(({ topic, details }: ICategories) => (
          <ListItem
            key={topic}
            sx={{
              borderRadius: '12px',
              margin: '0.5rem 0',
              '&:hover': { backgroundColor: '#F2F2F2' },
              backgroundColor: topic === defaultValue ? '#F2F2F2' : '',
              color: 'black',
              cursor: 'pointer',
              padding: '15px 20px'
            }}
            onClick={() => {
              onItemClick(topic);
            }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 530 }}>
                {topic}
              </Typography>
              {details ? (
                <Typography variant="subtitle2" sx={{ fontWeight: 450, opacity: 0.7 }}>
                  {details}
                </Typography>
              ) : (
                ''
              )}
            </Box>
            <Box
              data-testid="itemClick"
              sx={{ ml: 'auto' }}
              onClick={() => {
                onItemClick(topic);
              }}>
              <ArrowRightIcon />
            </Box>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default OnboardingList;
