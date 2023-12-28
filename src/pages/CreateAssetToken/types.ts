export const currencies = [{ label: 'USD' }, { label: 'EUR' }, { label: 'GBP' }];

// export enum CreateAssetTokenFlowSteps {
//   tokenBasicInformation = 'Token Basic Information',
//   tokenConfigutration = 'Token Configuration',
//   tokenPrice = 'Token Price'
// }

export enum CreateAssetTokenFlowSteps {
  tokenBasicInformation = 'tokenBasicInformation',
  tokenConfiguration = 'tokenConfiguration',
  tokenPrice = 'tokenPrice'
}

export enum CreateAssetFlows {
  'Token Basic Information',
  'Token Configuration',
  'Token Price'
}

export enum AssetConfigList {
  pausable = 'token_config_pausable',
  mint = 'token_config_mint',
  burn = 'token_config_burn',
  capped = 'token_config_capped'
}

export enum AssetConfigKeys {
  TokenConfigPausable = 'token_config_pausable',
  TokenConfigMint = 'token_config_mint',
  TokenConfigBurn = 'token_config_burn',
  TokenConfigCapped = 'token_config_capped'
}

export interface ITokenBasicInfoProps {
  next: (data: ITokenBasicInfoForm) => void;
}

export interface ITokenBasicInfoForm {
  tokenName: string;
  tokenSymbol: string;
  totalSupply: number | null;
  numberOfDecimal: number | null;
}

export interface IUploadLogo {
  uploadLogo: File | null;
}

export interface ITokenConfigurationProps {
  next: (data: ITokenConfigurationForm) => void;
  back: (data: ITokenConfigurationForm) => void;
}
export interface ITokenConfigurationForm {
  pausable: boolean;
  mintable: boolean;
  burnable: boolean;
  capped: boolean;
}

export interface ITokenPriceProps {
  submit: () => void;
  back: (data: ITokenPriceForm) => void;
  // setter: (name: string, file: File) => void;
}

export interface ITokenPriceForm {
  currency: string;
  buyPrice: number;
}

export type CreateAssetTokenType =
  | ITokenBasicInfoForm
  | ITokenConfigurationForm
  | ITokenPriceForm
  | IUploadLogo;
