import React, { type FC } from 'react';

import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import { Button, Stack, Typography, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CustomComponent from '@app/components/CustomInput/CustomInput';
import { type WithSignUpStepperContextProps } from '@app/common/types';

const taxescountry = RouteNames.PAY_COUNTRY_TAXES;
const CountryTaxes: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  isLoading,
  userPayload,
  goBack,
  activeStepIndex
}) => {
  const { t } = useTranslation();

  const addCountry = (): void => {
    console.log(activeStepIndex);
    goBack(activeStepIndex - 1);
  };

  return (
    <>
      <Stack sx={{ width: '436px' }}>
        <Heading title={t(`${taxescountry}.title`)} subTitle={t(`${taxescountry}.countrydetail`)} />

        <CustomComponent
          imageSrc="https://th.bing.com/th/id/R.37c8735fab040fc407c0d325d2b06190?rik=4f8O1hENs%2fq5%2fQ&pid=ImgRaw&r=0"
          text={`${t(`${taxescountry}.poland`)}`}
          code="98765AB"
          customStyle={{}}
        />
        <CustomComponent
          imageSrc="https://th.bing.com/th/id/R.37c8735fab040fc407c0d325d2b06190?rik=4f8O1hENs%2fq5%2fQ&pid=ImgRaw&r=0"
          text={`${t(`${taxescountry}.states`)}`}
          code="567651522AB"
          customStyle={{}}
        />

        <Box
          onClick={addCountry}
          sx={{
            display: 'flex',
            gap: '10px',
            background: '#EBEBEB',
            width: '380px',
            borderRadius: '10px',
            paddingLeft: '15px',
            alignItems: 'center',
            height: '5.2rem',
            marginTop: '8px',
            cursor: 'pointer',
            paddingTop: '13px'
          }}>
          <Typography>
            <AddCircleOutlineIcon />
          </Typography>
          <Typography sx={{ marginBottom: '5px' }}>{t(`${taxescountry}.addcountry`)}</Typography>
        </Box>
        <Button
          sx={{ marginTop: '20px', width: '400px' }}
          type="submit"
          onClick={() => updateActiveStep()}>
          {t(`${taxescountry}.continue`)}
        </Button>
      </Stack>
    </>
  );
};

export default CountryTaxes;
