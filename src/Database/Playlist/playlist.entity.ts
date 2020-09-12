import { Field, ID, ObjectType } from "type-graphql";
import { Track } from "../Track/track.entity";
import { User } from "../User/user.entity";

@ObjectType()
export class Playlist {
    @Field(type => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    isPrivate: boolean;

    @Field(returns => [Track])
    tracks: Track[]
    
    @Field(returns => User)
    owner: User;
    ownerId: number;
}