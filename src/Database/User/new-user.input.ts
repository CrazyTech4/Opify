import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";


@InputType()
export class NewUserInput {
    @Field()
    @MaxLength(40)
    name: string;

    @Field()
    part: number;

    @Field()
    albumId: number;
}