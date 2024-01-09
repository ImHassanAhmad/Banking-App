import {
  type onBoardType,
  type IThemeMode,
  type SupportedCountriesIncorporation,
  type SupportedCountriesPhone
} from '@app/types/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  themeMode: IThemeMode;
  supportedCountries: SupportedCountriesIncorporation & SupportedCountriesPhone;
  postOnboardingCompleted: boolean;
  email: string;
  userType?: onBoardType;
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
    setUser: (state, { payload: { email, userType } }) => {
      state.email = email;
      state.userType = userType;
    }
  }
});

export const { setThemeMode, setSupportedCountries, setPostOnboardingCompleted, setUser } =
  userDataSlice.actions;

export default userDataSlice;
