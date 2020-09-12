import { Service } from "typedi/decorators/Service";
import { DatabaseService } from "../database-service";
import { Track } from "../Track/track.entity";
import { Playlist } from "./playlist.entity";
import { NewPlaylistInput } from "./playlist.input";


@Service()
export class PlaylistService extends DatabaseService<Playlist, NewPlaylistInput> {
    constructor() {
        super('Playlist', Playlist);
    }

    async getTracks(id: number, offset: number, limit: number) {
        return await this.joinToMany(id, 'JoinTable_PlaylistTrack', 'Track', 'playlist_id', 'track_id', Track);
    }
}