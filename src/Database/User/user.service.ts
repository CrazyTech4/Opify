import { Service } from "typedi/decorators/Service";
import { Album } from "../Album/album.entity";
import { DatabaseService } from "../database-service";
import { User } from "./user.entity";
import { NewUserInput } from "./user.input";


@Service()
export class UserService extends DatabaseService<User, NewUserInput> {
    constructor() {
        super('User', User);
    }
}