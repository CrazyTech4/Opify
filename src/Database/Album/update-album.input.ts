import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Album } from "./album.entity";


@InputType()
export class UpdateAlbumInput {
    @Field({ nullable: true })
    @MaxLength(40)
    name: string;

    @Field({ nullable: true })
    @MaxLength(256)
    albumCoverFilepath: string;

    @Field({ nullable: true })
    artistId: number;
}