import { Arg, Args, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi/decorators/Service";
import { RangeArgs } from "../range.args";
import { Track } from "../Track/track.entity";
import { UserService } from "../User/user.service";
import { Playlist } from "./playlist.entity";
import { NewPlaylistInput } from "./playlist.input";
import { PlaylistService } from "./playlist.service";

@Service()
@Resolver(of => Playlist)
export class PlaylistResolver {
    constructor(private playlistService: PlaylistService,
                private userService: UserService) { }
    
    @Query(returns => Playlist)
    async playlist(@Arg('id') id: number) {
        const playlist = await this.playlistService.findById(id);
        if (!playlist) {
            throw new Error('Playlist not found');
        }
        return playlist;
    }

    @FieldResolver()
    async owner(@Root() playlist: Playlist) {
        return await this.userService.findById(playlist.ownerId);
    }

    @FieldResolver(returns => [Track])
    async tracks(@Root() playlist: Playlist,
                 @Args() range: RangeArgs) {
        return await this.playlistService.getTracks(playlist.id, range.offset, range.limit);
    }

    @Mutation(returns => Playlist)
    async addPlaylist(@Arg('playlistData') playlist: NewPlaylistInput) {
        return await this.playlistService.add(playlist);
    }

    @Mutation(returns => Boolean)
    async removePlaylist(@Arg('id') id: number) {
        // FIXME: always returns true
        try {
            await this.playlistService.remove(id);
            return true;
        } catch {
            return false;
        }
    }
}
