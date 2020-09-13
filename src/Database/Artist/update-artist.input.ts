import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";


@InputType()
export class UpdateArtistInput {
    @Field({ nullable: true })
    @MaxLength(256)
    title: string;
}