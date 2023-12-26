import { handlers as onBoardMockApiHandler } from './register-issuer.mock';
import { handlers as loginMockApiHandler } from './login.mock';

export default [...onBoardMockApiHandler, ...loginMockApiHandler];
