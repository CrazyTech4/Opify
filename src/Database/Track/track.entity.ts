import { Field, ID, ObjectType } from "type-graphql";
import { Artist } from "../Artist/artist.entity";
import { Volume } from "../Volume/volume.entity";

@ObjectType()
export class Track {
    @Field(type => ID)
    id: number;

    @Field()
    title: string;

    @Field({ nullable: true })
    filepath: string;
    
    @Field(returns => Artist)
    artist: Artist;
    artistId: number;

    @Field(returns => Volume)
    volume: Volume;
    volumeId: number;
}