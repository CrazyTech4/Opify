import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Playlist } from "../Playlist/playlist.entity";
import { Session } from "../Session/session.entity";


@InputType()
export class NewQueueInput {
    @Field()
    playingSessionId: number;

    @Field()
    playing: boolean;

    @Field()
    currentTrackIndex: number;

    @Field()
    currentAudioPosition: number;

    lastUpdate: Date;
}