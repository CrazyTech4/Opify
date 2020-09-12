import { Field, ID, ObjectType } from "type-graphql";
import { Artist } from "../Artist/artist.entity";

@ObjectType()
export class Album {
    @Field(type => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    albumCoverFilepath: string;
    
    @Field(returns => Artist)
    artist: Artist;
    artistId: number;

    @Field({ nullable: true })
    releaseData: Date;
}