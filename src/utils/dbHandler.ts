class DbHandler {
  readonly baseURL: string;

  constructor() {
    this.baseURL = 'http://localhost:3001';
  }

  async getAll(name: string, params: string = ''): Promise<unknown> {
    try {
      const response = await fetch(`${this.baseURL}/${name}${params}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${name}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching routes:', error);
      return [];
    }
  }

  async getById(name: string, id: number, params: string = ''): Promise<unknown> {
    try {
      const response = await fetch(`${this.baseURL}/${name}/${id}${params}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${name} of id ${id}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${name}`, error);
      return [];
    }
  }

  async add(name: string, data: unknown): Promise<unknown> {
    try {
      const response = await fetch(`${this.baseURL}/${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Failed to add new ${name}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error adding new ${name}`, error);
      return null;
    }
  }

  async update(name: string, id: number, data: unknown): Promise<unknown> {
    try {
      const response = await fetch(`${this.baseURL}/${name}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Failed to update new ${name} of id ${id}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating new ${name} of id ${id}`, error);
      return null;
    }
  }

  async delete(name: string, id: number): Promise<unknown> {
    try {
      const response = await fetch(`${this.baseURL}/${name}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Failed to delete ${name} of id ${id}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error deleting ${name} of id ${id}`, error);
      return null;
    }
  }
}

const handler: DbHandler = new DbHandler();

export default handler;
