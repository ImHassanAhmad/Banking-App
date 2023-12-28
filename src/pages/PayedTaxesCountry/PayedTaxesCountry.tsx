import React from 'react';

import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import { Button, Stack, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const taxescountry = RouteNames.PAY_COUNTRY_TAXES;
const PayedTaxesCountry: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const addCountry = () => {
    navigate('/security-number');
  };

  return (
    <>
      <Stack sx={{ width: '552px' }}>
        <Heading title={t(`${taxescountry}.title`)} subTitle={''} />

        <Typography sx={{ marginTop: '20px', width: '436px' }}>
          {t(`${taxescountry}.countrydetail`)}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            background: '#EBEBEB',
            width: '380px',
            borderRadius: '10px',
            paddingLeft: '15px',
            alignItems: 'center',
            height: '5.2rem',
            marginTop: '20px',
            cursor: 'pointer',
            paddingTop: '13px'
          }}>
          <Typography>
            {' '}
            <img
              src="https://th.bing.com/th/id/R.37c8735fab040fc407c0d325d2b06190?rik=4f8O1hENs%2fq5%2fQ&pid=ImgRaw&r=0"
              style={{ width: '24px', height: '24px' }}
            />
          </Typography>
          <Typography sx={{ marginBottom: '10px', fontSize: '15px' }}>
            {t(`${taxescountry}.poland`)}
            <br></br>98765AB
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            background: '#EBEBEB',
            width: '380px',
            borderRadius: '10px',
            paddingLeft: '15px',
            alignItems: 'center',
            height: '5.2rem',
            marginTop: '20px',
            cursor: 'pointer',
            paddingTop: '13px'
          }}>
          <Typography>
            {' '}
            <img
              src="https://th.bing.com/th/id/R.37c8735fab040fc407c0d325d2b06190?rik=4f8O1hENs%2fq5%2fQ&pid=ImgRaw&r=0"
              style={{ width: '24px', height: '24px' }}
            />
          </Typography>
          <Typography sx={{ marginBottom: '10px', fontSize: '15px' }}>
            {t(`${taxescountry}.states`)}
            <br></br>567651522AB
          </Typography>
        </Box>

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
            marginTop: '20px',
            cursor: 'pointer'
          }}>
          <Typography>
            <AddCircleOutlineIcon />
          </Typography>
          <Typography sx={{ marginBottom: '5px' }}>{t(`${taxescountry}.addcountry`)}</Typography>
        </Box>
        <Button sx={{ marginTop: '40px', width: '400px' }} type="submit" onClick={() => {}}>
          {t(`${taxescountry}.continue`)}
        </Button>
      </Stack>
    </>
  );
};

export default PayedTaxesCountry;
