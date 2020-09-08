import { Entity } from "../repository";
import { UserData } from "../User/user-data";


export class User extends Entity<UserData>{
    constructor(data: Partial<UserData>) {
        super('User');
        this.set(data);
    }
}