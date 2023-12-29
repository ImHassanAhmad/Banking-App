import { handlers as registerIssuerHandler } from './register-issuer.mock';
import { handlers as registerInvestorHandler } from './register-investor.mock';
import { handlers as loginMockApiHandler } from './login.mock';
import { handlers as assetMockApiHandler } from './asset.mock';

export default [
  ...registerIssuerHandler,
  ...registerInvestorHandler,
  ...loginMockApiHandler,
  ...assetMockApiHandler
];
