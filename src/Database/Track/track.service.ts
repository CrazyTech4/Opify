import { Service } from "typedi/decorators/Service";
import { Artist } from "../Artist/artist.entity";
import { DatabaseService } from "../database-service";
import { Track } from "./track.entity";
import { NewTrackInput } from "./track.input";


@Service()
export class TrackService extends DatabaseService<Track, NewTrackInput> {
    constructor() {
        super('Track', Track);
    }
}