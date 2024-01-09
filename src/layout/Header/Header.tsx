import { W1TTY_LOGO } from '@app/assets/images';
import LanguageSelect from '@app/components/LanguageSelect';
import { Stack, Box } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { setThemeMode } from '@app/store/slices/userData';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { themeMode } = useAppSelector((state) => state.userData);
  const darkMode = themeMode === 'DARK';
  const ThemeIcon = darkMode ? Brightness7Icon : Brightness4Icon;

  return (
    <Stack direction={'row'} alignItems={'center'} py={3} data-testid="header-wrapper">
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        width={{ xs: '80%', md: '50%' }}
        gap={2}>
        <Box
          sx={{ flex: 2, cursor: 'pointer' }}
          onClick={() => {
            navigate('/');
          }}>
          <img src={W1TTY_LOGO} alt="app logo" />
        </Box>
        <Box sx={{ flex: 10 }}>
          <LanguageSelect />
        </Box>

        <ThemeIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            dispatch(setThemeMode(darkMode ? 'LIGHT' : 'DARK'));
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Header;
