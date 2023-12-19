import { lazy } from 'react';
import type { IRouteConfig } from './types';
import { RouteNames } from '@app/constants/routes';
const Welcome = lazy(async () => await import('@app/pages/Welcome'));
const Email = lazy(async () => await import('@app/pages/RegisterEmail'));
const Login = lazy(async () => await import('@app/layout/LoginStepper'));
const PhoneNumber = lazy(async () => await import('@app/pages/PhoneNumber'));
const CountrySelect = lazy(async () => await import('@app/pages/CountrySelect/CountrySelect'));
const SignUpStepper = lazy(async () => await import('@app/layout/SignUpStepper'));
const CompanyInformation = lazy(async () => await import('@app/pages/CompanyInformation'));
const Password = lazy(async () => await import('@app/pages/Password'));
const NotFound = lazy(async () => await import('@app/pages/NotFound'));
const MobileCodeVerification = lazy(async () => await import('@app/pages/MobileCodeVerification'));
const EmailCodeVerification = lazy(
  async () => await import('@app/pages/LoginEmailCodeVerification')
);
const BusinessCategory = lazy(async () => await import('@app/pages/BusinessCategory'));
const SourceOfFunding = lazy(async () => await import('@app/pages/SourceOfFunding'));
const PersonalInformation = lazy(async () => await import('@app/pages/PersonalInformation'));
const Address = lazy(async () => await import('@app/pages/Address'));

export const publicRoutes: IRouteConfig[] = [
  {
    path: '/',
    element: Welcome
  },
  { path: RouteNames.COUNTRY, element: CountrySelect },
  { path: RouteNames.MOBILE, element: PhoneNumber },
  { path: RouteNames.SIGNUP, element: SignUpStepper },
  { path: RouteNames.COMPANY_INFORMATION, element: CompanyInformation },
  { path: RouteNames.COUNTRY, element: CountrySelect },
  { path: RouteNames.MOBILE, element: PhoneNumber },
  { path: RouteNames.VERIFY_MOBILE, element: MobileCodeVerification },
  { path: RouteNames.REGISTER_EMAIL, element: Email },
  { path: RouteNames.VERIFY_EMAIL, element: EmailCodeVerification },
  { path: RouteNames.CREATE_PASSWORD, element: Password },
  { path: RouteNames.LOGIN, element: Login },
  { path: RouteNames.NOT_FOUND, element: NotFound },
  { path: RouteNames.BUSINESS_CATEGORY, element: BusinessCategory },
  { path: RouteNames.SOURCE_OF_FUNDING, element: SourceOfFunding },
  { path: RouteNames.PERSONAL_INFORMATION, element: PersonalInformation },
  { path: RouteNames.ADDRESS, element: Address }
];

export const privateRoutes: IRouteConfig[] = [];
