import { type Table } from 'dexie';
import type {
  UserEntity,
  BaseEntity,
  AssetEntity,
  TokenEntity,
  IssuerDetailsEntity
} from './entity';
import { database } from '.';

class DatabaseService<T extends BaseEntity> {
  constructor(private readonly table: Table<T, string>) {}

  async getAll(): Promise<T[]> {
    return await this.table.toArray();
  }

  async getById(id: string): Promise<T | undefined> {
    return await this.table.get(id);
  }

  async add(entity: T): Promise<T> {
    await this.table.add(entity);
    return { ...entity };
  }

  async update(id: string, entity: T): Promise<T> {
    await this.table.put(entity, id);
    return entity;
  }

  async remove(id: string): Promise<void> {
    await this.table.delete(id);
  }
}

export const userService = new DatabaseService<UserEntity>(database.users);
export const assetService = new DatabaseService<AssetEntity>(database.assets);
export const tokensService = new DatabaseService<TokenEntity>(database.tokens);
export const issuerDetailsService = new DatabaseService<IssuerDetailsEntity>(
  database.issuerDetails
);
