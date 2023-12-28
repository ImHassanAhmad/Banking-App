import userDataSlice from './userData';
import createAssetTokenSlice from './CreateAssetToken';

export const reducerSlices = [
  { name: 'userData', reducer: userDataSlice },
  { name: createAssetTokenSlice.name, reducer: createAssetTokenSlice.reducer }
];
