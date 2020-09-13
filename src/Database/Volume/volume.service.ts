import { Service } from "typedi/decorators/Service";
import { Album } from "../Album/album.entity";
import { DatabaseService } from "../database-service";
import { Volume } from "./volume.entity";
import { UpdateVolumeInput } from "./update-volume.input";
import { NewVolumeInput } from "./new-volume.input";


@Service()
export class VolumeService extends DatabaseService<Volume, NewVolumeInput, UpdateVolumeInput> {
    constructor() {
        super('Volume', Volume);
    }

    async getAlbum(id: number) {
        return await this.joinToOne(id, 'album_id', 'Album', Album);
    }
}