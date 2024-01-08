import React from 'react';
import Box from '@mui/material/Box';
import Common from '../Common';
import { type ErrorOrWarningModalProps } from '../types';
import ModalWrapper from '../ModalWrapper';
import { Button, Stack } from '@mui/material';
import { ModalNames } from '@app/constants/modals';
import { useTranslation } from 'react-i18next';
import { modalStyles } from '../Common/styles';

const errorOrWarningModalNamespace = ModalNames.ERROR_OR_WARNING_MODAL;

const ErrorOrWarningModal: React.FC<ErrorOrWarningModalProps> = ({ title, message, ...props }) => {
  const { handleClose } = props;
  const { t } = useTranslation();
  return (
    <ModalWrapper {...props}>
      <Box sx={modalStyles} width={{ xs: 250, md: 400 }}>
        <Stack mt={1} gap={2}>
          <Common title={title ?? ''} subtitle={message ?? ''} />
          <Button sx={{ textTransform: 'uppercase' }} onClick={handleClose}>
            {t(`${errorOrWarningModalNamespace}.ok`)}
          </Button>
        </Stack>
      </Box>
    </ModalWrapper>
  );
};

export default ErrorOrWarningModal;
