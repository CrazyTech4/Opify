import { Arg, Args, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi/decorators/Service";
import { ArtistService } from "../Artist/artist.service";
import { RangeArgs } from "../range.args";
import { Album } from "./album.entity";
import { NewAlbumInput } from "./album.input";
import { AlbumService } from "./album.service";

@Service()
@Resolver(of => Album)
export class AlbumResolver {
    constructor(private albumService: AlbumService,
                private artistService: ArtistService) {}
    
    @Query(returns => Album)
    async album(@Arg('id') id: number) {
        const album = await this.albumService.findById(id);
        console.log('album', album);
        if (!album) {
            throw new Error('Album not found');
        }
        return album;
    }

    @FieldResolver()
    async artist(@Root() album: Album) {
        return await this.artistService.findById(album.artistId);
    }

    @Mutation(returns => Album)
    // @Authorized()
    async addAlbum(@Arg('albumData') album: NewAlbumInput) {
        return await this.albumService.add(album);
    }

    @Mutation(returns => Boolean)
    // @Authorized()
    async removeAlbum(@Arg('id') id: number) {
        // FIXME: always returns true
        try {
            await this.albumService.remove(id);
            return true;
        } catch {
            return false;
        }
    }
}
