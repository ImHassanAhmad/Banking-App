import { handlers as onBoardMockApiHandler } from './register.mock';
import { handlers as loginMockApiHandler } from './login.mock';

export default [...onBoardMockApiHandler, ...loginMockApiHandler];
