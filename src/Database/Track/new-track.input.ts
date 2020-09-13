import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";


@InputType()
export class NewTrackInput {
    @Field()
    @MaxLength(256)
    title: string;

    @Field({ nullable: true })
    @MaxLength(256)
    filepath: string;

    @Field()
    artistId: number;
    
    @Field()
    volumeId: number;
}