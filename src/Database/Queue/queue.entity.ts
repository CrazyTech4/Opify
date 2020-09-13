import { Field, ID, ObjectType } from "type-graphql";
import { Playlist } from "../Playlist/playlist.entity";
import { Session } from "../Session/session.entity";
import { Track } from "../Track/track.entity";
import { User } from "../User/user.entity";

@ObjectType()
export class Queue {
    @Field(type => ID)
    id: number;

    @Field(returns => Playlist)
    playlist: Playlist;
    playlistId: number;

    @Field(returns => Session)
    playingSession: Session;
    playingSessionId: number;

    @Field(returns => [Session])
    sessions: Session[];

    @Field()
    playing: boolean;

    @Field()
    currentTrackIndex: number;

    @Field()
    currentAudioPosition: number;

    @Field()
    lastUpdate: Date;

    @Field({ description: 'For the time difference on the client :)' })
    currentTime: Date;
}