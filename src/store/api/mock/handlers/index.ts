import { handlers as onBoardMockApiHandler } from './onboarding.mock';
import { handlers as loginMockApiHandler } from './login.mock';
import { handlers as assetMockApiHandler } from './asset.mock';

export default [...onBoardMockApiHandler, ...loginMockApiHandler, ...assetMockApiHandler];
