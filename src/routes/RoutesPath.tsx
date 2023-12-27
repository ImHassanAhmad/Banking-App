import { lazy } from 'react';
import type { IRouteConfig } from './types';
import { RouteNames } from '@app/constants/routes';
import UploadDocuments from '@app/pages/UploadDocuments';
import IncomeRange from '@app/pages/IncomeRange';
import CreateAssetToken from '@app/pages/CreateAssetToken/CreateAssetToken';
import PersonalInformation from '@app/pages/PersonalInformation';
import Address from '@app/pages/Address';
import QuestionsList from '@app/pages/QuestionsList';
// import OnboardingUserType from '@app/pages/OnboardingUserType';
import PostOnboarding from '@app/pages/PostOnboarding';

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
  { path: RouteNames.UPLOAD_DOCUMENTS, element: UploadDocuments },
  { path: RouteNames.SOURCE_OF_FUNDING, element: SourceOfFunding },
  { path: RouteNames.INCOME_RANGE, element: IncomeRange },
  { path: RouteNames.PERSONAL_INFORMATION, element: PersonalInformation },
  { path: RouteNames.ADDRESS, element: Address },
  { path: RouteNames.QUESTIONS_LIST, element: QuestionsList },
  { path: RouteNames.CREATE_ASSET_TOKEN, element: CreateAssetToken },
  { path: RouteNames.SOURCE_OF_FUNDING, element: SourceOfFunding },
  { path: RouteNames.POST_ONBOARDING, element: PostOnboarding }
];

export const privateRoutes: IRouteConfig[] = [];
