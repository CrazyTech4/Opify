import { Field, ID, ObjectType } from "type-graphql";
import { Album } from "../Album/album.entity";
import { Artist } from "../Artist/artist.entity";

@ObjectType()
export class User {
    @Field(type => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;
    
    @Field()
    passwordHash: string;

    @Field(returns => Album)
    favoritePlaylist: Album;
    favoritePlaylistId: number;
}