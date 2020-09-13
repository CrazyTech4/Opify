import { Arg, Args, Authorized, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi/decorators/Service";
import { ArtistService } from "../Artist/artist.service";
import { VolumeService } from "../Volume/volume.service";
import { NewTrackInput } from "./new-track.input";
import { Track } from "./track.entity";
import { TrackService } from "./track.service";

@Service()
@Resolver(of => Track)
export class TrackResolver {
    constructor(private volumeService: VolumeService,
                private artistService: ArtistService,
                private trackService: TrackService) {}
    
    @Query(returns => Track)
    async track(@Arg('id') id: number) {
        const track = await this.trackService.findById(id);
        if (!track) {
            throw new Error('Track not found');
        }
        return track;
    }

    @FieldResolver()
    async artist(@Root() track: Track) {
        return await this.trackService.getArtist(track.id);
    }

    @FieldResolver()
    async album(@Root() track: Track) {
        return await this.trackService.getAlbum(track.id);
    }

    @FieldResolver()
    async features(@Root() track: Track) {
        return await this.trackService.getFeatures(track.id);
    }

    @FieldResolver()
    async volume(@Root() track: Track) {
        return await this.volumeService.findById(track.volumeId);
    }

    @Mutation(returns => Track)
    async addTrack(@Arg('trackData') track: NewTrackInput) {
        return await this.trackService.add(track);
    }

    @Mutation(returns => Boolean)
    async removeTrack(@Arg('id') id: number) {
        // FIXME: always returns true
        try {
            await this.trackService.remove(id);
            return true;
        } catch {
            return false;
        }
    }
}