import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";


@InputType()
export class NewArtistInput {
    @Field()
    @MaxLength(256)
    title: string;
}