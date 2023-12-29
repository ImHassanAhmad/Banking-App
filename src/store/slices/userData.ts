import type {
  IThemeMode,
  SupportedCountriesIncorporation,
  SupportedCountriesPhone
} from '@app/common/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  themeMode: IThemeMode;
  supportedCountries: SupportedCountriesIncorporation & SupportedCountriesPhone;
  postOnboardingCompleted: boolean;
  email: string;
} = {
  themeMode: 'LIGHT',
  supportedCountries: {
    supportedCountriesOfIncorporation: [],
    supportedPhoneCountries: []
  },
  postOnboardingCompleted: false,
  email: ''
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
    },
    setPostOnboardingCompleted: (state, { payload }) => {
      state.postOnboardingCompleted = payload;
    },
    setEmail: (state, { payload }) => {
      state.email = payload;
    }
  }
});

export const { setThemeMode, setSupportedCountries, setPostOnboardingCompleted, setEmail } =
  userDataSlice.actions;

export default userDataSlice;
