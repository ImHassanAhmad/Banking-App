import React from 'react';
import Box from '@mui/material/Box';
import type { ConfirmationModalProps } from '../types';
import ModalWrapper from '../ModalWrapper';
import { Button, Stack } from '@mui/material';
import { modalStyles } from '../Common/styles';
import Common from '../Common';

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  leftButtonText,
  rightButtonText,
  subtitle,
  title2,
  ...props
}) => {
  const { leftButtonOnclickHandler, rightButtonOnclickHandler } = props;

  return (
    <ModalWrapper {...props}>
      <Box sx={modalStyles} width={{ xs: '70%', sm: '50%', md: '30%' }}>
        <Stack mt={1} gap={2}>
          <Common title={title} subtitle={subtitle} />
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Button
              data-testid="left-btn"
              sx={{ textTransform: 'uppercase', width: '45%' }}
              onClick={() => {
                if (leftButtonOnclickHandler) leftButtonOnclickHandler();
              }}>
              {leftButtonText}
            </Button>
            <Button
              data-testid="right-btn"
              sx={{ textTransform: 'uppercase', width: '45%' }}
              onClick={() => {
                if (rightButtonOnclickHandler) rightButtonOnclickHandler();
              }}>
              {rightButtonText}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </ModalWrapper>
  );
};

export default ConfirmationModal;
