import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";


@InputType()
export class NewVolumeInput {
    @Field()
    part: number;

    @Field()
    albumId: number;
}