import React from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { APP_LANGUAGES } from '@app/constants/languages';

interface LanguageSelectProps {
  noExtraPadding?: boolean;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ noExtraPadding }) => {
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent): void => {
    i18n
      .changeLanguage(event.target.value, (error) => {
        if (error) {
          console.log(error);
        }
      })
      .then(() => {
        // mayber refresh?
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FormControl fullWidth data-testid="lng-selector">
      <Select
        value={i18n.language}
        onChange={handleChange}
        MenuProps={{
          sx: {
            marginTop: '5px',
            '& .Mui-selected': {
              background: '#EBEBEB !important'
            },
            '& .Mui-selected:hover': {
              background: '#EBEBEB !important'
            },
            '& .MuiButtonBase-root': {
              width: '23rem'
            },
            width: '30rem',
            left: '5rem',
            background: 'transparent'
          }
        }}
        sx={{
          height: '3.6rem',
          minWidth: '13.2rem',
          maxWidth: '15rem',
          borderRadius: '100px',
          background: '#fff',
          '.MuiSelect-select': {
            padding: noExtraPadding ? '5px' : ''
          }
        }}>
        {APP_LANGUAGES.map(({ displayName, key, icon }) => (
          <MenuItem key={key} value={key} data-testid={displayName} role="container">
            <Stack direction={'row'} gap={1}>
              <img src={icon} alt="language icon" />
              <Typography variant="caption">{displayName}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
