import { Arg, Args, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi/decorators/Service";
import { AlbumService } from "../Album/album.service";
import { ArtistService } from "../Artist/artist.service";
import { RangeArgs } from "../range.args";
import { Volume } from "./volume.entity";
import { NewVolumeInput } from "./volume.input";
import { VolumeService } from "./volume.service";

@Service()
@Resolver(of => Volume)
export class VolumeResolver {
    constructor(private volumeService: VolumeService,
                private albumService: AlbumService) { }
    
    @Query(returns => Volume)
    async volume(@Arg('id') id: number) {
        const volume = await this.volumeService.findById(id);
        if (!volume) {
            throw new Error('Volume not found');
        }
        return volume;
    }

    @FieldResolver()
    async album(@Root() volume: Volume) {
        return await this.albumService.findById(volume.albumId);
    }

    @Mutation(returns => Volume)
    // @Authorized()
    async addVolume(@Arg('volumeData') volume: NewVolumeInput) {
        return await this.volumeService.add(volume);
    }

    @Mutation(returns => Boolean)
    // @Authorized()
    async removeVolume(@Arg('id') id: number) {
        // FIXME: always returns true
        try {
            await this.volumeService.remove(id);
            return true;
        } catch {
            return false;
        }
    }
}
