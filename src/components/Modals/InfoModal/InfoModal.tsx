import React from 'react';
import Box from '@mui/material/Box';
import Common from '../Common';
import type { InfoModalProps } from '../types';
import ModalWrapper from '../ModalWrapper';
import { Button, Stack } from '@mui/material';
import { modalStyles } from '../Common/styles';

const EmailAlreadyRegisteredModal: React.FC<InfoModalProps> = ({
  title,
  buttonText,
  subtitle,
  ...props
}) => {
  const { handleClose } = props;
  return (
    <ModalWrapper {...props}>
      <Box sx={modalStyles} width={{ xs: 250, md: 400 }}>
        <Stack mt={1} gap={2}>
          <Common title={title} subtitle={subtitle} />
          <Button sx={{ textTransform: 'uppercase' }} onClick={handleClose}>
            {buttonText}
          </Button>
        </Stack>
      </Box>
    </ModalWrapper>
  );
};

export default EmailAlreadyRegisteredModal;
