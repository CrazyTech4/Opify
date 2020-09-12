import { Arg, Args, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi/decorators/Service";
import { PlaylistService } from "../Playlist/playlist.service";
import { User } from "../User/user.entity";
import { NewUserInput } from "../User/user.input";
import { UserService } from "../User/user.service";

@Service()
@Resolver(of => User)
export class UserResolver {
    constructor(private userService: UserService,
                private playlistService: PlaylistService) { }
    
    @Query(returns => User)
    async user(@Arg('id') id: number) {
        const user = await this.userService.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    @FieldResolver()
    async favoritePlaylist(@Root() user: User) {
        return await this.playlistService.findById(user.favoritePlaylistId);
    }

    @Mutation(returns => User)
    // @Authorized()
    async addWolume(@Arg('userData') user: NewUserInput) {
        return await this.userService.add(user);
    }

    @Mutation(returns => Boolean)
    // @Authorized()
    async removeUser(@Arg('id') id: number) {
        // FIXME: always returns true
        try {
            await this.userService.remove(id);
            return true;
        } catch {
            return false;
        }
    }
}
