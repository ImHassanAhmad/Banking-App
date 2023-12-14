import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import type { InfoModalProps } from '../types';
import ModalWrapper from '../ModalWrapper';
import { Button, Stack } from '@mui/material';
import { INFO_ICON } from '@app/assets/images';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1.25,
  p: 4
};

const EmailAlreadyRegisteredModal: React.FC<InfoModalProps> = ({
  title,
  buttonText,
  subtitle,
  ...props
}) => {
  const { handleClose } = props;
  return (
    <ModalWrapper {...props}>
      <Box sx={style} width={{ xs: 250, md: 400 }}>
        <Stack mt={1} gap={2}>
          <Box
            component={'img'}
            src={INFO_ICON}
            alt="info icon"
            sx={{ width: '64px', height: '64px' }}
          />
          <Typography
            id="transition-modal-title"
            sx={{
              fontSize: '3.6rem',
              lineHeight: '3.6rem',
              fontWeight: 500
            }}>
            {title}
          </Typography>
          <Typography
            id="transition-modal-description"
            sx={{
              fontSize: '1.8rem',
              fontWeight: 450,
              opacity: '70%',
              display: 'inline'
            }}>
            {subtitle}
          </Typography>

          <Button sx={{ textTransform: 'uppercase' }} onClick={handleClose}>
            {buttonText}
          </Button>
        </Stack>
      </Box>
    </ModalWrapper>
  );
};

export default EmailAlreadyRegisteredModal;
