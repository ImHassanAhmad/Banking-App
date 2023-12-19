import { handlers as onBoardMockApiHandler } from './onboarding.mock';
import { handlers as loginMockApiHandler } from './login.mock';

export default [...onBoardMockApiHandler, ...loginMockApiHandler];
