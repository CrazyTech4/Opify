import { Service } from "typedi/decorators/Service";
import { Album } from "../Album/album.entity";
import { DatabaseService } from "../database-service";
import { Playlist } from "../Playlist/playlist.entity";
import { User } from "./user.entity";
import { UpdateUserInput } from "./update-user.input";
import { NewUserInput } from "./new-user.input";


@Service()
export class UserService extends DatabaseService<User, NewUserInput, UpdateUserInput> {
    constructor() {
        super('User', User);
    }

    async getPlaylistFollowings(id: number) {
        return await this.joinToMany(id, 'JoinTable_PlaylistFollow', 'Playlist', 'user_id', 'playlist_id', Playlist);
    }

    async getSessions(id: number) {
        return await this.joinThemBack(id, 'user_id', 'UserSession');
    }
}