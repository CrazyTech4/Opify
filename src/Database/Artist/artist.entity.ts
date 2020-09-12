import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Artist {
    @Field(type => ID)
    id: number;

    @Field()
    name: string;
}