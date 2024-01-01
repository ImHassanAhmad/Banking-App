import type { IssuerDetailsEntity, Issuer, AssetTokenCreationEntity } from './entity';

export interface RegisterIssuerRequest extends Issuer {
  dryRun: boolean;
}

export interface PostOnboardingRequest extends IssuerDetailsEntity {}

export interface AssetTokenRequest extends AssetTokenCreationEntity {}
