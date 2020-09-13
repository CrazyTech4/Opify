import Container from "typedi";
import { NewArtistInput } from "./Artist/new-artist.input";
import { Database } from "./database";


export abstract class DatabaseService<Type, NewInputData, UpdateInputData> {
    protected database: Database;

    constructor(private tablename: string,
                private entity: any) {
        this.database = Container.get(Database);
    }

    async findById(id: number) {
        if (!id) {
            return null;
        } 
        return await this.fetchDeserialized(`SELECT * FROM ${this.tablename} WHERE id=? LIMIT 1`, [id]);
    }

    // TODO: use deserialization of the corresponding service
    async joinToOne(id: number, field: string, referencedTablename: string, type: any) {
        return await this.fetchDeserialized(`SELECT referenced.* FROM ${this.tablename} actual JOIN ${referencedTablename} AS referenced ON actual.${field} = referenced.id WHERE actual.id=?`, [id]);
    }

    async joinToMany(id: number, joinTablename: string, hisTablename: string, myField: string, hisField: string, type: any) {
        const result = await this.fetchAllDeserialized(`SELECT his.* FROM ${this.tablename} my
        JOIN ${joinTablename} AS joinTable ON my.id = joinTable.${myField}
        JOIN ${hisTablename} AS his ON his.id = joinTable.${hisField}
        WHERE my.id=?`, [id]);
        console.log(result);
        return result;
    }

    async joinThemBack(id: number, hisField: string, hisTablename: string) {
        return await this.fetchAllDeserialized(`SELECT his.* FROM ${this.tablename} my JOIN ${hisTablename} AS his ON his.${hisField} = my.id WHERE my.id = ?`, [id]);
    }

    async list(offset: number, limit: number) {
        const all = await this.fetchAllDeserialized(`SELECT * FROM ${this.tablename} LIMIT ?,?`, [offset, limit]);
        console.log(all);
        return all;
    }

    async add(data: NewInputData) {
        const serialized = this.serialize(data);
        const keys = Object.keys(serialized).join(',');
        const values = Object.values(serialized);
        const result = await this.database.query(`INSERT INTO ${this.tablename} (${keys}) VALUES (?)`, [values]);
        const id = result.insertId;
        const newData = Object.assign({id}, data);
        return newData;
    }

    async update(id: number, data: UpdateInputData) {
        const serialized = this.serialize(data);
        await this.database.query(`UPDATE ${this.tablename} SET ? WHERE id=?`, [serialized, id]);
        return data;
    }

    async remove(id: number) {
        try {
            await this.database.query(`DELETE FROM ${this.tablename} WHERE id=?`, [id]);
            return true;
        } catch {
            return false;
        }
    }

    protected toCamelCase(name: string) {
        return name.split('_').map((part, i) => {
            if (i === 0) {
                return part;
            }
            return part.charAt(0).toUpperCase() + part.slice(1);
        }).join('');
    }

    protected toSnakeCase(name: string) {
        return name.replace(/[A-Z]/g, (substring: string, ...args: any[]) => {
            return '_' + substring.toLowerCase();
        });
    }

    async fetchDeserialized(sql: string, values: any) {
        const result = await this.database.fetch(sql, values);
        const serialized = this.deserialize(result);
        return serialized;
    }

    async fetchAllDeserialized(sql: string, values: any) {
        const result = await this.database.fetchAll(sql, values);
        const serialized = result.map(item => this.deserialize(item));
        return serialized;
    }

    private convertInto(data: any, type: any, intoWhat: Function) {
        const result = new type();
        Object.keys(data)
            .forEach(key => {
                result[intoWhat(key)] = data[key];
            });
        return result;
    }

    serialize(entity: NewInputData | UpdateInputData) {
        const serialized = this.convertInto(entity, this.entity, this.toSnakeCase);
        Object.keys(serialized)
            .forEach(key => {
                if (typeof(serialized[key]) === 'object') {
                    delete serialized[key];
                }
            });
        return serialized;
    }

    deserialize(data: any) {
        return this.convertInto(data, this.entity, this.toCamelCase);
    }
}