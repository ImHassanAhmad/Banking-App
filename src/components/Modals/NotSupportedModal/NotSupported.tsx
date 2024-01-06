import React from 'react';
import Box from '@mui/material/Box';
import { type NotSupportedModalProps } from '../types';
import ModalWrapper from '../ModalWrapper';
import { Button, Stack } from '@mui/material';
import { ModalNames } from '@app/constants/modals';
import Common from '../Common';
import { useTranslation } from 'react-i18next';
import { NOT_SUPPORTED_MODES } from '@app/constants';
import { modalStyles } from '../Common/styles';

const NotSupportedModal: React.FC<NotSupportedModalProps> = (props) => {
  const { handleClose, country, mode } = props;
  const notSupportedNamespace =
    mode === NOT_SUPPORTED_MODES.country
      ? ModalNames.COUNTRY_NOT_SUPPORTED
      : ModalNames.REGION_NOT_SUPPORTED;
  const { t } = useTranslation();
  return (
    <ModalWrapper {...props}>
      <Box sx={modalStyles} width={{ xs: 250, md: 400 }}>
        <Stack mt={1} gap={2}>
          <Common
            title={t(`${notSupportedNamespace}.title`)}
            subtitle={t(`${notSupportedNamespace}.subtitle`, { name: country?.name })}
          />
          <Button
            sx={{ textTransform: 'uppercase', bgcolor: '#000', color: '#fff' }}
            onClick={handleClose}>
            {t(`${notSupportedNamespace}.change`)}
          </Button>
        </Stack>
      </Box>
    </ModalWrapper>
  );
};

export default NotSupportedModal;
