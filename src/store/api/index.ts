import { onBoardingApi } from './onboarding';
import { loginApi } from './login';
import { assetTokenApi } from './tokens';
import { assetApi } from './asset';
import { resetPasswordApi } from './reset-password';

export const apiEndpoints = [onBoardingApi, loginApi, assetApi, assetTokenApi, resetPasswordApi];
