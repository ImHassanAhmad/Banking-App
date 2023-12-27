import { type Issuer } from './entity';

export interface RegisterIssuerRequest extends Issuer {
  dryRun: boolean;
}
