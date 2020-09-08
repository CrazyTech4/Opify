import { Entity } from "../repository";
import { PlaylistData } from "./playlist-data";


export class Playlist extends Entity<PlaylistData>{
    constructor(data: Partial<PlaylistData>) {
        super('Playlist');
        this.set(data);
    }
}