import type {
  IThemeMode,
  SupportedCountriesIncorporation,
  SupportedCountriesPhone
} from '@app/common/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  themeMode: IThemeMode;
  supportedCountries: SupportedCountriesIncorporation & SupportedCountriesPhone;
} = {
  themeMode: 'LIGHT',
  supportedCountries: {
    supportedCountriesOfIncorporation: [],
    supportedPhoneCountries: []
  }
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setThemeMode: (state, { payload }) => {
      state.themeMode = payload;
    },
    setSupportedCountries: (state, { payload }) => {
      state.supportedCountries = payload;
    }
  }
});

export const { setThemeMode, setSupportedCountries } = userDataSlice.actions;

export default userDataSlice;
