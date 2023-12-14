import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { type NotSupportedModalProps } from '../types';
import ModalWrapper from '../ModalWrapper';
import { Button, Stack } from '@mui/material';
import { ModalNames } from '@app/constants/modals';
import { useTranslation } from 'react-i18next';
import { NOT_SUPPORTED_MODES } from '@app/constants';

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

const NotSupportedModal: React.FC<NotSupportedModalProps> = (props) => {
  const { handleClose, country, mode } = props;
  const notSupportedNamespace =
    mode === NOT_SUPPORTED_MODES.country
      ? ModalNames.COUNTRY_NOT_SUPPORTED
      : ModalNames.REGION_NOT_SUPPORTED;
  const { t } = useTranslation();
  return (
    <ModalWrapper {...props}>
      <Box sx={style} width={{ xs: 250, md: 400 }}>
        <Stack mt={1} gap={2}>
          <Box
            component={'img'}
            src={country?.icon}
            alt="dummy flag"
            sx={{ width: '64px', height: '64px', borderRadius: '64px', objectFit: 'cover' }}
          />
          <Typography
            id="transition-modal-title"
            sx={{
              fontSize: '3.6rem',
              lineHeight: '3.6rem',
              fontWeight: 500
            }}>
            {t(`${notSupportedNamespace}.title`)}
          </Typography>
          <Typography
            id="transition-modal-description"
            sx={{
              fontSize: '1.8rem',
              fontWeight: 450,
              opacity: '70%',
              display: 'inline'
            }}>
            {t(`${notSupportedNamespace}.subtitle`, { name: country?.name })}
          </Typography>

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
