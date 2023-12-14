import { type FC } from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { type SearchBarProps } from './types';
import { SEARCHBAR_ICON } from '@app/assets/images';

const SearchBar: FC<SearchBarProps> = ({ value, handleChange, iconPosition = 'start' }) => {
  return (
    <TextField
      fullWidth
      value={value}
      placeholder={'Search beneficiary'}
      onChange={handleChange}
      InputProps={{
        startAdornment: iconPosition === 'start' && (
          <InputAdornment position="start">
            <Box component="img" src={SEARCHBAR_ICON} alt="search" />
          </InputAdornment>
        ),
        endAdornment: iconPosition === 'end' && (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
  );
};

export default SearchBar;
