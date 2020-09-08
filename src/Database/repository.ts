import { Database } from "./database.class";

interface EntityData {
    id?: number;
}

export class Entity<Type extends EntityData> {
    public data: Partial<Type> = {};
    public isUpToDate = true;

    constructor(private tablename: string) { }

    /**
     * turns values that are entities into their id
     */
    private async justifiedData() {
        const justifiedData = Object.assign({}, this.data);
        await Promise.all(Object.keys(justifiedData).map(async key => {
                if (key === 'id') {
                    delete justifiedData[key];
                    return;
                }

                const entity = justifiedData[key];
                if (entity instanceof Entity) {
                    await entity.merge(); // for entities that aren't up to date with the database
                    if (!entity.data.id) {
                        throw new Error(`please first insert ${entity.tablename} before inserting ${this.tablename} to prevent this error. Also do not forget the 'await' keyword :)`);
                    }
                    justifiedData[key + '_id'] = entity.data.id;
                    delete justifiedData[key];
                    return;
                }
            })
        );
        console.log('justifiedData', justifiedData);
        return justifiedData;
    }

    set(data: Partial<Type>) {
        Object.assign(this.data, data);
        this.isUpToDate = false;
    }

    upToDate() {
        this.isUpToDate = true;
    }

    async insert() {
        if (this.isUpToDate) {
            return;
        }
        this.upToDate();
        const data = await this.justifiedData();
        const keys = Object.keys(data).join(',');
        const values = Object.values(data);
        const [result, buff] = await Database.query(`INSERT INTO ${this.tablename} (${keys}) VALUES (?)`, [values]) as any;
        this.data.id = result.insertId;
        console.log('id ' + this.tablename, this.data.id)
    }

    async update() {
        if (this.isUpToDate) {
            return;
        }
        this.upToDate();
        const data = await this.justifiedData();
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