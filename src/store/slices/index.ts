import userDataSlice from './userData';
import createAssetTokenSlice from './CreateAssetToken';
import postOnboardingSlice from './issuerOnboarding';

export const reducerSlices = [
  { name: userDataSlice.name, reducer: userDataSlice.reducer },
  { name: postOnboardingSlice.name, reducer: postOnboardingSlice.reducer },
  { name: createAssetTokenSlice.name, reducer: createAssetTokenSlice.reducer }
];
