import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";


@InputType()
export class NewPlaylistInput {
    @Field()
    @MaxLength(40)
    name: string;

    @Field()
    isPrivate: boolean;

    @Field()
    ownerId: number;
}