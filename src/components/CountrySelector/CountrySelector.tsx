import { ARROW_RIGHT, SEARCH_ICON } from '@app/assets/images';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Box } from '@mui/system';
import { ALL_COUNTRIES } from '@app/constants/countries';
import { type ICountrySelectorProps } from './types';
import { type CountrySelectOption } from '@app/common/types';

const CountrySelector: React.FC<ICountrySelectorProps> = ({
  placeholder,
  selectedCountry,
  onChange,
  isDisabled = false
}) => {
  const theme: any = useTheme();
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  return (
    <Autocomplete
      disabled={isDisabled}
      data-testid="cnt-selector"
      id="country-select"
      options={ALL_COUNTRIES ?? []}
      value={selectedCountry as CountrySelectOption}
      defaultValue={selectedCountry}
      onOpen={() => {
        setIsPopupOpen(true);
      }}
      onClose={() => {
        setIsPopupOpen(false);
      }}
      onChange={(event, value) => {
        onChange(value);
      }}
      autoHighlight
      disableClearable={true}
      getOptionLabel={({ name }) => name}
      renderOption={(props, option) => (
        <Box
          key={option.iso2}
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}>
          <Stack direction="row" gap={1} alignItems="center">
            <img src={option.icon} className={styles.flag} alt="language icon" />
            <Typography>{option.name}</Typography>
          </Stack>
        </Box>
      )}
      popupIcon={null}
      clearOnBlur={false}
      renderInput={(params) => (
        <Box
          sx={{
            position: 'relative',
            borderRadius: '1rem'
          }}>
          {selectedCountry?.icon ? (
            <img src={selectedCountry.icon} className={styles.flag_input} alt="language icon" />
          ) : (
            <></>
          )}
          <TextField
            {...params}
            placeholder={placeholder}
            sx={{
              height: '5.6rem',
              margin: '3rem 0 2rem 0',
              borderRadius: '1rem',
              background: theme.palette.grey[700],
              cursor: 'pointer',
              '.MuiOutlinedInput-notchedOutline': { borderStyle: 'none' }
            }}
            inputProps={{
              ...params.inputProps,
              style: {
                marginLeft: selectedCountry ? '4rem' : ''
              },
              autoComplete: 'new-password',
              'data-testid': 'selector-content-input'
            }}
          />
          <img
            src={isPopupOpen ? SEARCH_ICON : ARROW_RIGHT}
            alt={isPopupOpen ? 'search icon' : 'arrow  icon'}
            className={isPopupOpen ? styles.search : styles.arrow}
          />
        </Box>
      )}
    />
  );
};

export default CountrySelector;
