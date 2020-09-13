import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";


@InputType()
export class UpdateVolumeInput {
    @Field({ nullable: true})
    part: number;

    @Field({ nullable: true})
    albumId: number;
}