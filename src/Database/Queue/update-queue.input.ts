import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Playlist } from "../Playlist/playlist.entity";
import { Session } from "../Session/session.entity";


@InputType()
export class UpdateQueueInput {
    @Field({ nullable: true })
    playingSessionId: number;

    @Field({ nullable: true })
    playing: boolean;

    @Field({ nullable: true })
    currentTrackIndex: number;

    @Field({ nullable: true })
    currentAudioPosition: number;

    lastUpdate: Date;
}