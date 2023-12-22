enum Entity {
  Issuer = 'users'
}

type Params = string | URLSearchParams | string[][] | Record<string, string> | undefined;

class DatabaseService<E extends Entity, T> {
  readonly baseURL: string;

  constructor(private readonly entityType: E) {
    this.baseURL = 'http://localhost:3001';
  }

  private async handleRequest(url: string, method: string, data?: unknown): Promise<T | null> {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error('Error processing request:', error);
      return null;
    }
  }

  async getAll(params: Params = {}): Promise<T[] | null> {
    const url = new URL(`${this.baseURL}/${this.entityType}`);
    const queryParams = new URLSearchParams(params);
    url.search = queryParams.toString();
    return (await this.handleRequest(url.toString(), 'GET')) as T[] | null;
  }

  async getById(id: number, params: Params = {}): Promise<T | null> {
    const url = new URL(`${this.baseURL}/${this.entityType}/${id}`);
    const queryParams = new URLSearchParams(params);
    url.search = queryParams.toString();
    return await this.handleRequest(url.toString(), 'GET');
  }

  async add(data: unknown): Promise<T | null> {
    const url = `${this.baseURL}/${this.entityType}`;
    return await this.handleRequest(url, 'POST', data);
  }

  async update(id: number, data: unknown): Promise<T | null> {
    const url = `${this.baseURL}/${this.entityType}/${id}`;
    return await this.handleRequest(url, 'PUT', data);
  }

  async delete(id: number): Promise<T | null> {
    const url = `${this.baseURL}/${this.entityType}/${id}`;
    return await this.handleRequest(url, 'DELETE');
  }
}

// Usage example
// const dbService = new DatabaseService<Entity, YourTypeHere>(Entity.Issuer);

export { Entity, DatabaseService };
