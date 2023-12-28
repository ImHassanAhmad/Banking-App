import type {
  ITokenPriceForm,
  ITokenBasicInfoForm,
  ITokenConfigurationForm
} from '@app/pages/CreateAssetToken/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  tokenBasicInfo: ITokenBasicInfoForm | null;
  tokenConfig: ITokenConfigurationForm | null;
  tokenPrice: ITokenPriceForm | null;
} = {
  tokenBasicInfo: null,
  tokenConfig: null,
  tokenPrice: null
};

export const createAssetTokenSlice = createSlice({
  name: 'createAssetToken',
  initialState,
  reducers: {
    setTokenBasicInfo: (state, { payload }) => {
      state.tokenBasicInfo = payload;
    },
    setTokenConfig: (state, { payload }) => {
      state.tokenConfig = payload;
    },
    setTokenPrice: (state, { payload }) => {
      state.tokenPrice = payload;
    }
  }
});

export const { setTokenBasicInfo, setTokenConfig, setTokenPrice } = createAssetTokenSlice.actions;

export default createAssetTokenSlice;
