import React from 'react';
import Box from '@mui/material/Box';
import ModalWrapper from '../ModalWrapper';
import { Button, Stack } from '@mui/material';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { type AddNewAgentProps } from './types';
import Heading from '@app/components/Heading';
import Textfield from '@app/components/Textfield';
import { useForm } from 'react-hook-form';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1.25,
  p: 4,
  width: 900
};

const translationNamespace = RouteNames.AGENT_DETAIL;

const AddNewAgent: React.FC<AddNewAgentProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors }
  } = useForm();

  console.log(errors);
  return (
    <ModalWrapper {...props}>
      <Box sx={style} width={{ xs: 250, md: 400 }}>
        <Stack mt={1} gap={2}>
          <Stack direction={'row'}>
            <Heading
              title={t(`${translationNamespace}.title_add_agent`)}
              subTitle={t(`${translationNamespace}.subtitle_add_agent`)}
            />
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <form
              role={'form-id'}
              style={{ width: '100%' }}
              onSubmit={(event) => {
                // void handleSubmit(onSubmit)(event);
              }}>
              <Stack direction={'row'} gap={2} mt={3}>
                <Textfield
                  name="name"
                  label={t(`${translationNamespace}.agent_name`)}
                  style={{ width: '100%' }}
                  register={register}
                  // errorValue={errors.name}
                  fullWidth
                />
                <Textfield
                  name="email"
                  label={t(`${translationNamespace}.agent_email`)}
                  register={register}
                  // errorValue={errors.email}
                  style={{ width: '100%' }}
                  fullWidth
                />
                <Textfield
                  name="address"
                  label={t(`${translationNamespace}.agent_address`)}
                  register={register}
                  // errorValue={errors.email}
                  style={{ width: '100%' }}
                  fullWidth
                />
              </Stack>
            </form>
          </Stack>
          <Stack>
            <Button>Add Agent</Button>
          </Stack>
        </Stack>
      </Box>
    </ModalWrapper>
  );
};

export default AddNewAgent;
