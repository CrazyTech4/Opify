import { Field, ID, ObjectType } from "type-graphql";
import { Album } from "../Album/album.entity";
import { Artist } from "../Artist/artist.entity";
import { Playlist } from "../Playlist/playlist.entity";
import { Queue } from "../Queue/queue.entity";
import { User } from "../User/user.entity";

@ObjectType()
export class Session {
    @Field(type => ID)
    id: number;

    @Field()
    name: string;

    @Field(returns => User)
    user: User;
    userId: number;

    @Field()
    accessToken: string;
    
    @Field()
    reloadToken: string;

    @Field(returns => Queue, { nullable: true })
    currentQueue: Queue;
    currentQueueId: number;
}