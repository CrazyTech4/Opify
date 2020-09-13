import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateSessionInput {
    @Field({ nullable: true })
    @MaxLength(30)
    name: string;

    @Field({ nullable: true })
    userId: number;

    @Field({ nullable: true })
    @MaxLength(256)
    accessToken: string;
    
    @Field({ nullable: true })
    @MaxLength(256)
    reloadToken: string;

    @Field({ nullable: true })
    currentQueueId: number;
}