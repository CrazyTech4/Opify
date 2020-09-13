import { MaxLength } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Album } from "../Album/album.entity";
import { Artist } from "../Artist/artist.entity";
import { Playlist } from "../Playlist/playlist.entity";
import { Queue } from "../Queue/queue.entity";
import { User } from "../User/user.entity";

@InputType()
export class NewSessionInput {
    @Field()
    @MaxLength(30)
    name: string;

    @Field()
    userId: number;

    @Field()
    @MaxLength(256)
    accessToken: string;
    
    @Field()
    @MaxLength(256)
    reloadToken: string;

    @Field({ nullable: true })
    currentQueueId: number;
}