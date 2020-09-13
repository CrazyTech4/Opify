import { Service } from "typedi/decorators/Service";
import { DatabaseService } from "../database-service";
import { Artist } from "./artist.entity";
import { NewArtistInput } from "./new-artist.input";
import { UpdateArtistInput } from "./update-artist.input";


@Service()
export class ArtistService extends DatabaseService<Artist, NewArtistInput, UpdateArtistInput> {
    constructor() {
        super('Artist', Artist);
    }
}