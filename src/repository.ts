import { Database } from "./database.class";

interface EntityData {
    id?: number;
}

export class Entity<Type extends EntityData> {
    private data: Partial<Type> = {};

    constructor(private tablename: string) { }

    set(data: Partial<Type>) {
        Object.assign(this.data, data);
    }

    async insert() {
        const keys = Object.keys(this.data);
        const values = Object.values(this.data);
        const [result, buff] = await Database.execute(`INSERT INTO ${this.tablename} ? VALUES ?`, [keys, values]) as any;
        this.data.id = result.insertId;
    }

    async update() {
        await Database.execute(`UPDATE ${this.tablename} WHERE id=? SET ?`, [this.data.id, this.data]);
    }
}