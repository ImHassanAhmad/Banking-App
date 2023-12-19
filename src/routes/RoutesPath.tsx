import { lazy } from 'react';
import type { IRouteConfig } from './types';
import { RouteNames } from '@app/constants/routes';
import IncomeRange from '@app/pages/IncomeRange';

const Welcome = lazy(async () => await import('@app/pages/Welcome'));
const Login = lazy(async () => await import('@app/layout/LoginStepper'));
const InvestorSignUpStepper = lazy(async () => await import('@app/layout/InvestorSignUpStepper'));
const IssuerSignUpStepper = lazy(async () => await import('@app/layout/IssuerSignUpStepper'));
const NotFound = lazy(async () => await import('@app/pages/NotFound'));
const EmailCodeVerification = lazy(
  async () => await import('@app/pages/LoginEmailCodeVerification')
);
const SourceOfFunding = lazy(async () => await import('@app/pages/SourceOfFunding'));
const PersonalInformation = lazy(async () => await import('@app/pages/PersonalInformation'));
const Address = lazy(async () => await import('@app/pages/Address'));
const QuestionsList = lazy(async () => await import('@app/pages/QuestionsList'));

export const publicRoutes: IRouteConfig[] = [
  {
    path: '/',
    element: Welcome
  },
  { path: RouteNames.INVESTOR_SIGNUP, element: InvestorSignUpStepper },
  { path: RouteNames.ISSUER_SIGNUP, element: IssuerSignUpStepper },
  { path: RouteNames.VERIFY_EMAIL, element: EmailCodeVerification },
  { path: RouteNames.LOGIN, element: Login },
  { path: RouteNames.NOT_FOUND, element: NotFound },
  { path: RouteNames.SOURCE_OF_FUNDING, element: SourceOfFunding },
  { path: RouteNames.SOURCE_OF_FUNDING, element: SourceOfFunding },
  { path: RouteNames.INCOME_RANGE, element: IncomeRange },
  { path: RouteNames.PERSONAL_INFORMATION, element: PersonalInformation },
  { path: RouteNames.ADDRESS, element: Address },
  { path: RouteNames.QUESTIONS_LIST, element: QuestionsList }
];

export const privateRoutes: IRouteConfig[] = [];
