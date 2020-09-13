import { Service } from "typedi/decorators/Service";
import { AlbumService } from "../Album/album.service";
import { Artist } from "../Artist/artist.entity";
import { ArtistService } from "../Artist/artist.service";
import { DatabaseService } from "../database-service";
import { Volume } from "../Volume/volume.entity";
import { NewTrackInput } from "./new-track.input";
import { Track } from "./track.entity";
import { UpdateTrackInput } from "./update-track.input";


@Service()
export class TrackService extends DatabaseService<Track, NewTrackInput, UpdateTrackInput> {
    constructor(private albumService: AlbumService,
                private artistService: ArtistService) {
        super('Track', Track);
    }

    async getVolume(id: number) {
        return await this.joinToOne(id, 'volume_id', 'Volume', Volume); 
    }

    async getAlbum(id: number) {
        return await this.albumService.fetchDeserialized('SELECT album.* FROM Track JOIN Volume ON Track.volume_id = Volume.id JOIN Album ON Volume.album_id = Album.id WHERE Track.id = ?', [id]);
    }

    async getArtist(id: number) {
        return await this.artistService.fetchDeserialized('SELECT artist.* FROM Track JOIN Volume ON Track.volume_id = Volume.id JOIN Album ON Volume.album_id = Album.id JOIN Artist ON Album.artist_id = Artist.id WHERE Track.id = ?', [id]);
    }

    async getFeatures(id: number) {
        return await this.joinToMany(id, 'TrackFeature', 'Artist', 'track_id', 'artist_id', Artist);
    }
}