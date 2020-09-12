import { Service } from "typedi/decorators/Service";
import { Artist } from "../Artist/artist.entity";
import { DatabaseService } from "../database-service";
import { Album } from "./album.entity";
import { NewAlbumInput } from "./album.input";


@Service()
export class AlbumService extends DatabaseService<Album, NewAlbumInput> {
    constructor() {
        super('Album', Album);
    }

    async getArtist(id: number) {
        return await this.joinToOne(id, 'artist_id', 'Artist', Artist);
    }
}