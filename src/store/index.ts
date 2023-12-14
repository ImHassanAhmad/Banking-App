import {
  combineReducers,
  configureStore,
  type ReducersMapObject,
  type PreloadedState
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiEndpoints } from './api';
import { reducerSlices } from './slices';
import type { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { rtkQueryErrorLogger } from './utils';

const reducerObject: ReducersMapObject = {};
const middleware: any[] = [rtkQueryErrorLogger];

apiEndpoints.forEach((api) => {
  reducerObject[api.reducerPath] = api.reducer;
  middleware.push(api.middleware);
});
reducerSlices.forEach((slice) => (reducerObject[slice.name] = slice.reducer));

const rootReducer = combineReducers(reducerObject);

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (
  preloadedState?: PreloadedState<RootState>,
  devTools = true
): ToolkitStore => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
  });
};

export const store = setupStore();

setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
