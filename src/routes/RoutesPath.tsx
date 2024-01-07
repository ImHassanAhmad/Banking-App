import { lazy } from 'react';
import type { IRouteConfig } from './types';
import { RouteNames } from '@app/constants/routes';
import UploadDocuments from '@app/pages/UploadDocuments';
import IncomeRange from '@app/pages/IncomeRange';
import CreateAssetToken from '@app/pages/CreateAssetToken/CreateAssetToken';
import IssuerOnboarding from '@app/pages/IssuerOnboarding';
import Dashboard from '@app/pages/Dashboard';

const Welcome = lazy(async () => await import('@app/pages/Welcome'));
const Login = lazy(async () => await import('@app/layout/LoginStepper'));
const OnboardingUserType = lazy(async () => await import('@app/pages/OnboardingUserType'));
const InvestorSignUpStepper = lazy(async () => await import('@app/layout/InvestorSignUpStepper'));
const IssuerSignUpStepper = lazy(async () => await import('@app/layout/IssuerSignUpStepper'));
const NotFound = lazy(async () => await import('@app/pages/NotFound'));
const EmailCodeVerification = lazy(
  async () => await import('@app/pages/LoginEmailCodeVerification')
);
const SourceOfFunding = lazy(async () => await import('@app/pages/SourceOfFunding'));
const CreateNewAsset = lazy(async () => await import('@app/pages/CreateNewAsset'));

export const publicRoutes: IRouteConfig[] = [
  {
    path: '/',
    element: Welcome
  },
  { path: RouteNames.ONBOARDING, element: OnboardingUserType },
  { path: RouteNames.INVESTOR_SIGNUP, element: InvestorSignUpStepper },
  { path: RouteNames.ISSUER_SIGNUP, element: IssuerSignUpStepper },
  { path: RouteNames.VERIFY_EMAIL, element: EmailCodeVerification },
  { path: RouteNames.LOGIN, element: Login },
  { path: RouteNames.NOT_FOUND, element: NotFound },
  { path: RouteNames.CREATE_NEW_ASSET, element: CreateNewAsset },
  { path: RouteNames.UPLOAD_DOCUMENTS, element: UploadDocuments },
  { path: RouteNames.SOURCE_OF_FUNDING, element: SourceOfFunding },
  { path: RouteNames.INCOME_RANGE, element: IncomeRange },
  { path: RouteNames.CREATE_ASSET_TOKEN, element: CreateAssetToken },
  { path: RouteNames.SOURCE_OF_FUNDING, element: SourceOfFunding }
];

export const privateRoutes: IRouteConfig[] = [
  { path: RouteNames.ISSUER_ONBOARDING, element: IssuerOnboarding },
  { path: RouteNames.DASHBOARD, element: Dashboard }
];
