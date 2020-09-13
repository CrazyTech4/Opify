import { Service } from "typedi/decorators/Service";
import { Artist } from "../Artist/artist.entity";
import { DatabaseService } from "../database-service";
import { Album } from "./album.entity";
import { NewAlbumInput } from "./new-album.input";
import { UpdateAlbumInput } from "./update-album.input";


@Service()
export class AlbumService extends DatabaseService<Album, NewAlbumInput, UpdateAlbumInput> {
    constructor() {
        super('Album', Album);
    }

    async getArtist(id: number) {
        return await this.joinToOne(id, 'artist_id', 'Artist', Artist);
    }
}