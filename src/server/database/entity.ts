export interface BaseEntity {
  id: string;
}

export interface UserEntity extends BaseEntity {
  email: string;
}

export interface AssetEntity extends BaseEntity {
  assetId: string;
}

export interface TokenEntity extends BaseEntity {
  tokenId: string;
}
