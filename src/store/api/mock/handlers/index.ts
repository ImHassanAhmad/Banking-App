import { handlers as onBoardMockApiHandler } from './onboarding.mock';
import { handlers as loginMockApiHandler } from './login.mock';
import { handlers as assetMockApiHandler } from './asset.mock';
import { handlers as issuerOnboardingHandler } from './issuer-onboarding.mock';

export default [
  ...onBoardMockApiHandler,
  ...loginMockApiHandler,
  ...assetMockApiHandler,
  ...issuerOnboardingHandler
];
