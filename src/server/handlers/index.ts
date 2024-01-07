import { handlers as registerIssuerHandler } from './register-issuer.mock';
import { handlers as registerInvestorHandler } from './register-investor.mock';
import { handlers as loginMockApiHandler } from './login.mock';
import { handlers as assetMockApiHandler } from './asset.mock';
import { handlers as postOnboardingHandler } from './issuer-onboarding.mock';
import { handlers as tokenApiHandler } from './token.mock';
import { handlers as resetPassworsApiHandler } from './password-reset.mock';

export default [
  ...registerIssuerHandler,
  ...registerInvestorHandler,
  ...loginMockApiHandler,
  ...assetMockApiHandler,
  ...postOnboardingHandler,
  ...tokenApiHandler,
  ...resetPassworsApiHandler
];
