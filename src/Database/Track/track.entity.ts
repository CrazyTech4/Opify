import { Field, ID, ObjectType } from "type-graphql";
import { Album } from "../Album/album.entity";
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
    
    @Field(returns => Album)
    album: Album;

    @Field(returns => Artist)
    artist: Artist;

    @Field(returns => [Artist])
    features: Artist[]

    @Field(returns => Volume)
    volume: Volume;
    volumeId: number;
}