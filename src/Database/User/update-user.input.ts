import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";


@InputType()
export class UpdateUserInput {
    @Field({ nullable: true })
    @MaxLength(40)
    name: string;

    @Field({ nullable: true })
    part: number;

    @Field({ nullable: true })
    albumId: number;
}