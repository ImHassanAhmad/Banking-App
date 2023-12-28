import type { IssuerDetailsEntity, Issuer } from './entity';

export interface RegisterIssuerRequest extends Issuer {
  dryRun: boolean;
}

export interface PostOnboardingRequest extends IssuerDetailsEntity {}
