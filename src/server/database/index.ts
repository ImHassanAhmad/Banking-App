import { Dexie, type Table } from 'dexie';
import { type AssetEntity, type TokenEntity, type UserEntity } from './entity';

export class AppDatabase extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  users!: Table<UserEntity, string>;
  tokens!: Table<TokenEntity, string>;
  assets!: Table<AssetEntity, string>;

  constructor() {
    super('Tokenization');
    this.version(1).stores({
      users: 'id, name, age',
      tokens: 'id',
      assets: 'id'
    });
  }
}

export const database = new AppDatabase();