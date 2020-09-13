import { Service } from "typedi/decorators/Service";
import { DatabaseService } from "../database-service";
import { Track } from "../Track/track.entity";
import { Playlist } from "./playlist.entity";
import { NewPlaylistInput } from "./new-playlist.input";
import { UpdatePlaylistInput } from "./update-playlist.input";


@Service()
export class PlaylistService extends DatabaseService<Playlist, NewPlaylistInput, UpdatePlaylistInput> {
    constructor() {
        super('Playlist', Playlist);
    }

    async getTracks(id: number, offset: number, limit: number) {
        return await this.joinToMany(id, 'JoinTable_PlaylistTrack', 'Track', 'playlist_id', 'track_id', Track);
    }

    async addTrack(id: number, trackId: number) {
        return await this.database.execute(`INSERT INTO JoinTable_PlaylistTrack (playlist_id, track_id) VALUES (?)`, [[id, trackId]]);
    }
}