export const currencies = [{ label: 'USD' }, { label: 'EUR' }, { label: 'GBP' }];

export enum CreateAssetTokenFlowSteps {
  tokenBasicInformation = 'Token Basic Information',
  tokenConfigutration = 'Token Configuration',
  tokenPrice = 'Token Price'
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
