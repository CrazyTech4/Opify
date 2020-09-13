import { Service } from "typedi/decorators/Service";
import { Album } from "../Album/album.entity";
import { DatabaseService } from "../database-service";
import { Playlist } from "../Playlist/playlist.entity";
import { Queue } from "../Queue/queue.entity";
import { NewSessionInput } from "./new-session.input";
import { Session } from "./session.entity";
import { UpdateSessionInput } from "./update-session.input";


@Service()
export class SessionService extends DatabaseService<Session, NewSessionInput, UpdateSessionInput> {
    constructor() {
        super('Session', Session);
    }

    getCurrentQueue(id: number) {
        return this.joinToOne(id, 'current_queue_id', 'TemporaryQueue', Queue);
    }
}