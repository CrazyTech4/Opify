import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { NewPlaylistInput } from "./new-playlist.input";


@InputType()
export class UpdatePlaylistInput {
    @Field({ nullable: true })
    @MaxLength(40)
    name: string;

    @Field({ nullable: true })
    isPrivate: boolean;

    @Field({ nullable: true })
    ownerId: number;
}