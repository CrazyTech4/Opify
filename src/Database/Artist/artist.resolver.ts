import { Arg, Args, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi/decorators/Service";
import { Database } from "../database";
import { RangeArgs } from "../range.args";
import { Artist } from "./artist.entity";
import { NewArtistInput } from "./new-artist.input";
import { ArtistService } from "./artist.service";

@Service()
@Resolver(of => Artist)
export class ArtistResolver {
    constructor(private artistService: ArtistService) {}
    
    @Query(returns => Artist)
    async artist(@Arg('id') id: number) {
        const artist = this.artistService.findById(id);
        if (!artist) {
            throw new Error('Artist not found');
        }
        return artist;
    }
}
