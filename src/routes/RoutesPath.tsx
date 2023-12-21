import { lazy } from 'react';
import type { IRouteConfig } from './types';
import { RouteNames } from '@app/constants/routes';

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
  { path: RouteNames.SOURCE_OF_FUNDING, element: SourceOfFunding }
];

export const privateRoutes: IRouteConfig[] = [];
