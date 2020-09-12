import { Field, ID, ObjectType } from "type-graphql";
import { Album } from "../Album/album.entity";
import { Artist } from "../Artist/artist.entity";

@ObjectType()
export class Volume {
    @Field(type => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    part: number;
    
    @Field(returns => Album)
    album: Album;
    albumId: number;
}