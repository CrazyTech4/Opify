import { Database } from "./database.class";

interface EntityData {
    id?: number;
}

export class Entity<Type extends EntityData> {
    public data: Partial<Type> = {};

    constructor(private tablename: string) { }

    /**
     * turns values that are entities into their id
     */
    private justifiedData() {
        const justifiedData = Object.assign({}, this.data);
        Object.keys(justifiedData)
            .forEach(key => {
                if (key === 'id') {
                    delete justifiedData[key];
                    return;
                }

                const entity = justifiedData[key];
                if (entity instanceof Entity) {
                    entity.merge(); // for entities that aren't uptodate with the database
                    delete justifiedData[key];
                    justifiedData[key + '_id'] = entity.data.id;
                    return;
                }
            });
        return justifiedData;
    }

    set(data: Partial<Type>) {
        Object.assign(this.data, data);
    }

    async insert() {
        const data = this.justifiedData();
        const keys = Object.keys(data).join(',');
        const values = Object.values(data);
        const [result, buff] = await Database.query(`INSERT INTO ${this.tablename} (${keys}) VALUES (?)`, [values]) as any;
        this.data.id = result.insertId;
    }

    async update() {
        const data = this.justifiedData();
        await Database.query(`UPDATE ${this.tablename} SET ? WHERE id=?`, [data, this.data.id]);
    }

    async merge() {
        if (this.data.id) {
            await this.update();
        } else {
            await this.insert();
        }
    }
}