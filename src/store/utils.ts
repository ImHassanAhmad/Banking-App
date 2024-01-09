import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import auth from '@app/utils/auth';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { type AccessTokenRefreshResponse } from '@app/types/types';

// create a new mutex
const mutex = new Mutex();

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  const message = action?.payload?.data?.message;
  if (isRejectedWithValue(action) && message) {
    toast.error(message);
  }

  return next(action);
};

export const baseQuery = fetchBaseQuery({
  prepareHeaders: (headers) => {
    if (!headers.get('X-Access-Token')) {
      const token = auth.accessToken();
      headers.set('X-Access-Token', `${token}`);
    }
    return headers;
  }
});

export const smeBaseQuery = fetchBaseQuery({
  prepareHeaders: (headers) => {
    headers.set('x-api-key', 'W1ttySMEToken');
    return headers;
  }
});

// TODO this is the original end point which is going to be used to refresh token etc but
// its not fully connected yet so we have it here. We will go with hardcoded refresh token for now.

export const refreshSessionQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
): Promise<void> => {
  const result = await baseQuery(
    {
      url: 'v1/sme/onboarding/authentication/refresh-session',
      body: {}
    },
    api,
    extraOptions
  );
  if (result.data) {
    // parse result data
  } else {
    auth.logout();
  }
};

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  switch (result?.error?.status) {
    case 401:
    case 403:
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshResult = await baseQuery(
            {
              url: 'external/v1/auth/refresh-session',
              method: 'POST',
              headers: {
                'X-Access-Token': ''
              }
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            const response = refreshResult.data as AccessTokenRefreshResponse;
            auth.saveAccessToken(response.accessToken ?? '');
            // api.dispatch(tokenReceived(refreshResult.data));
            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
          } else {
            // auth.logout();
          }
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
      break;
    default:
      break;
  }
  return result;
};
