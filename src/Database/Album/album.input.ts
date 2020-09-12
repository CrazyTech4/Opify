import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Album } from "./album.entity";


@InputType()
export class NewAlbumInput {
    @Field()
    @MaxLength(40)
    name: string;

    @Field()
    @MaxLength(256)
    albumCoverFilepath: string;

    @Field()
    artistId: number;
}