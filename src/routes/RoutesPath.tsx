import { lazy } from 'react';
import type { IRouteConfig } from './types';
import { RouteNames } from '@app/constants/routes';
import CreateAssetToken from '@app/pages/CreateAssetToken/CreateAssetToken';
import IssuerOnboarding from '@app/pages/IssuerOnboarding';
import Dashboard from '@app/pages/Dashboard';
import ManageAssets from '@app/pages/ManageAssets';
import AssetDetails from '@app/pages/AssetDetails';

const Welcome = lazy(async () => await import('@app/pages/Welcome'));
const Login = lazy(async () => await import('@app/layout/LoginStepper'));
const OnboardingUserType = lazy(async () => await import('@app/pages/OnboardingUserType'));
const InvestorSignUpStepper = lazy(async () => await import('@app/layout/InvestorSignUpStepper'));
const IssuerSignUpStepper = lazy(async () => await import('@app/layout/IssuerSignUpStepper'));
const NotFound = lazy(async () => await import('@app/pages/NotFound'));
const CreateNewAsset = lazy(async () => await import('@app/pages/CreateNewAsset'));
const ResetPasswordStepper = lazy(
  async () => await import('@app/layout/ResetPasswordStepper/ResetPasswordStepper')
);

export const publicRoutes: IRouteConfig[] = [
  {
    path: '/',
    element: Welcome
  },
  { path: RouteNames.ONBOARDING, element: OnboardingUserType },
  { path: RouteNames.INVESTOR_SIGNUP, element: InvestorSignUpStepper },
  { path: RouteNames.ISSUER_SIGNUP, element: IssuerSignUpStepper },
  { path: RouteNames.LOGIN, element: Login },
  { path: RouteNames.NOT_FOUND, element: NotFound },
  { path: RouteNames.RESET_PASSWORD, element: ResetPasswordStepper }
];

export const privateRoutes: IRouteConfig[] = [
  { path: RouteNames.ISSUER_ONBOARDING, element: IssuerOnboarding },
  { path: RouteNames.DASHBOARD, element: Dashboard },
  { path: RouteNames.MANAGE_ASSETS, element: ManageAssets },
  {
    path: RouteNames.MANAGE_ASSETS + '/' + RouteNames.CREATE_ASSET_TOKEN,
    element: CreateAssetToken,
    params: '/:assetId'
  },
  {
    path: RouteNames.MANAGE_ASSETS + '/' + RouteNames.ASSET_DETAILS,
    element: AssetDetails,
    params: '/:assetId'
  },
  { path: RouteNames.MANAGE_ASSETS + '/' + RouteNames.CREATE_NEW_ASSET, element: CreateNewAsset }
];
