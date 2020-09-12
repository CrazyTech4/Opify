import { Service } from "typedi/decorators/Service";
import { DatabaseService } from "../database-service";
import { Artist } from "./artist.entity";
import { NewArtistInput } from "./artist.input";


@Service()
export class ArtistService extends DatabaseService<Artist, NewArtistInput> {
    constructor() {
        super('Artist', Artist);
    }
}