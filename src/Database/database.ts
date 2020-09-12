import { Connection, createConnection } from "mysql2/promise";
import { Service } from "typedi/decorators/Service";

@Service()
export class Database {
    connection: Connection;

    async connect() {
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

    async execute(sql: string, values?: any) {
        await this.connect();
        return await this.connection.execute(sql, values);
    }

    async query(sql: string, values?: any): Promise<any> {
        await this.connect();
        const result = (await this.connection.query(sql, values))[0];
        console.log(sql, result);
        return result;
    }

    async fetch(sql: string, values: any) {
        return (await this.query(sql, values))[0] ?? null; 
    }

    async fetchAll(sql: string, values: any) {
        return await this.query(sql, values); 
    }

    // // TODO: Thats really dirtyy
    // private convertInto(data: any, type: any, intoWhat: Function) {
    //     const result = new type();
    //     console.log('converting', data);
    //     Object.keys(data)
    //         .forEach(key => {
    //             console.log(`result[${intoWhat(key)}] = data[${key}]`);
    //             result[intoWhat(key)] = data[key];
    //         });
    //     return result;
    // }

    
    // async fetchInto(sql: string, values: any, type: any) {
    //     await this.connect();
    //     const result = (await this.query(sql, values))[0];
    //     const converted = this.convertInto(result, type, this.toCamelCase);
    //     console.log(converted);
    //     return converted;
    // }

    // // TODO: Thats really dirtyy
    // async fetchAllInto(sql: string, values: any, type: any) {
    //     await this.connect();
    //     const result = await this.query(sql, values);
    //     return result.map(item => this.convertInto(item, type, this.toCamelCase));
    // }

    async disconnect() {
        if (!this.connection) {
            return;
        }
        this.connection.end();
        this.connection = null;
    }
}