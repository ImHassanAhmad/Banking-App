import React, { useCallback, useState } from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import { Box, Button, Stack, Typography } from '@mui/material';
import Textfield from '@app/components/Textfield';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
const SecurityNumber = RouteNames.SECURITY_NUMBER;

const SocialSecurityNumber: React.FC = () => {
  const { t } = useTranslation();
  const [currentInput, setCurrentInput] = useState('');
  const [textInputArray, setTextInputArray] = useState<string[]>([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(event.target.value);
  };
  const handleButtonClick = useCallback(() => {
    if (!currentInput) return;
    setTextInputArray((prevArray) => {
      const updatedArray = [...prevArray, currentInput];
      console.log(updatedArray);
      return updatedArray;
    });
    setCurrentInput('');
  }, [currentInput]);

  return (
    <>
      <Stack sx={{ width: '552px' }}>
        <Heading title={t(`${SecurityNumber}.title`)} subTitle={''} />
        <Box sx={{ display: 'flex', gap: '5px', marginTop: '20px' }}>
          <img
            src="https://th.bing.com/th/id/R.37c8735fab040fc407c0d325d2b06190?rik=4f8O1hENs%2fq5%2fQ&pid=ImgRaw&r=0"
            style={{ width: '24px', height: '24px' }}
          />
          <Typography>{t(`${SecurityNumber}.states`)}</Typography>
        </Box>
        <Typography sx={{ marginTop: '20px', width: '436px' }}>
          {t(`${SecurityNumber}.statesdetail`)}{' '}
        </Typography>
        <Box sx={{ marginTop: '20px' }}>
          <Textfield sx={{ width: '400px' }} value={currentInput} onChange={handleInputChange} />
          <Box
            sx={{
              display: 'flex',
              gap: '5px',
              background: '#EBEBEB',
              borderRadius: '10px',
              padding: '5px',
              marginTop: '10px',
              width: '300px',
              paddingTop: '13px'
            }}>
            <Typography>
              <ErrorOutlineIcon />
            </Typography>
            <Typography>{t(`${SecurityNumber}.stateserror`)}</Typography>
          </Box>
        </Box>
        <Button
          sx={{ marginTop: '40px', width: '400px' }}
          type="submit"
          onClick={handleButtonClick}>
          {t(`${SecurityNumber}.continue`)}
        </Button>

        {/* <ul style={{ fontSize: '30px' }}>
          {textInputArray.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul> */}
      </Stack>
    </>
  );
};

export default SocialSecurityNumber;
