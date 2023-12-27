import type {
  ICompanyStructureForm,
  IKycForm,
  ILegalRepresentativeForm
} from '@app/pages/PostOnboarding/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  companyStructure: ICompanyStructureForm | null;
  legalRepresentatives: ILegalRepresentativeForm | null;
  kyc: IKycForm | null;
} = {
  companyStructure: null,
  legalRepresentatives: null,
  kyc: null
};

export const postOnboardingSlice = createSlice({
  name: 'postOnboarding',
  initialState,
  reducers: {
    setCompanyStructure: (state, { payload }) => {
      state.companyStructure = payload;
    },
    setLegalRepresentatives: (state, { payload }) => {
      state.legalRepresentatives = payload;
    },
    setKyc: (state, { payload }) => {
      state.kyc = payload;
    }
  }
});

export const { setCompanyStructure, setLegalRepresentatives, setKyc } = postOnboardingSlice.actions;

export default postOnboardingSlice;
