import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";


@InputType()
export class UpdateTrackInput {
    @Field({ nullable: true })
    @MaxLength(256)
    title: string;

    @Field({ nullable: true })
    @MaxLength(256)
    filepath: string;

    @Field({ nullable: true })
    artistId: number;
    
    @Field({ nullable: true })
    volumeId: number;
}