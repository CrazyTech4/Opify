import { Connection, createConnection } from 'mysql2/promise';


export class Database {
    static connection: Connection;

    static async connect() {
        if (this.connection) {
            return;
        }
        this.connection = await createConnection({
            host: 'localhost',
            user: 'lossle',
            password: '1234',
            database: 'lossle'
        });
    }

    static async execute(sql: string, values?: any) {
        await this.connect();
        return await this.connection.execute(sql, values);
    }

    static async query(sql: string, values?: any) {
        await this.connect();
        return await this.connection.query(sql, values);
    }

    // TODO: Thats really dirtyy
    static async fetchAllInto(sql: string, values: any, type: any) {
        await this.connect();
        const result = await this.query(sql, values);
        return result.map(item => {
            const a = new type();
            a.set(item);
            return a;
        });
    }

    static async disconnect() {
        if (!this.connection) {
            return;
        }
        this.connection.end();
        this.connection = null;
    }
}