import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { type PrivacyPolicyProps } from '../types';
import ModalWrapper from '../ModalWrapper';
import { Stack } from '@mui/material';
import { CANCEL_ICON } from '@app/assets/images';
import LanguageSelect from '@app/components/LanguageSelect';
import { ModalNames } from '@app/constants/modals';
import { useTranslation } from 'react-i18next';

const parentStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1.25,
  p: 4,
  height: '100%',
  width: '100%',
  gap: '4rem'
};

const headerStyle = {
  width: '100%',
  borderBottom: '1px #EBEBEB solid'
};

const privacyPolicyNamespace = ModalNames.PRIVACY_POLICY;

const PrivacyPolicyModal: React.FC<PrivacyPolicyProps> = (props) => {
  const { handleClose } = props;
  const { t } = useTranslation();
  return (
    <ModalWrapper {...props}>
      <Stack sx={parentStyle} alignItems={'center'}>
        <Stack sx={headerStyle} alignItems={'center'} py={2} height={'5%'}>
          <Stack sx={{ width: '100%', marginBottom: '2rem' }}>
            <Stack
              paddingLeft={{ xs: '5%', md: '20%' }}
              paddingRight={{ xs: '5%', md: '20%' }}
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Stack width={140}>
                <LanguageSelect noExtraPadding />
              </Stack>
              <Box
                component={'img'}
                height={'30px'}
                src={CANCEL_ICON}
                alt="cancel icon"
                onClick={handleClose}
              />
            </Stack>
          </Stack>
        </Stack>

        <Stack mt={1} gap={3} width="100%" height={'80%'} sx={{ overflowY: 'scroll' }}>
          <Stack
            height={'15%'}
            paddingLeft={{ xs: '5%', md: '20%' }}
            paddingRight={{ xs: '5%', md: '20%' }}>
            <Typography
              id="transition-modal-title"
              sx={{
                fontSize: '3.6rem',
                fontWeight: 530
              }}>
              {t(`${privacyPolicyNamespace}.title`)}
            </Typography>
            <Typography
              sx={{
                fontSize: '1.6rem',
                fontWeight: 530
              }}>
              {t(`${privacyPolicyNamespace}.subtitle`)}
            </Typography>
          </Stack>
          <Stack direction="row">
            <Stack
              gap={2}
              sx={{
                overflowY: 'scroll',
                height: '100%'
              }}
              paddingLeft={{ xs: '5%', md: '20%' }}
              paddingRight={{ xs: '5%', md: '20%' }}>
              <Typography
                id="transition-modal-description"
                sx={{
                  fontSize: '1.6rem',
                  fontWeight: 450,
                  textAlign: 'left'
                }}>
                {t(`${privacyPolicyNamespace}.who_we_are`)}
              </Typography>
              <Typography
                id="transition-modal-description"
                sx={{
                  fontSize: '1.6rem',
                  fontWeight: 450,
                  textAlign: 'left'
                }}>
                {t(`${privacyPolicyNamespace}.description`)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </ModalWrapper>
  );
};

export default PrivacyPolicyModal;
