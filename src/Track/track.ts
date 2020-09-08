import { Entity } from "../Database/repository";
import { TrackData } from "./track-data";



export class Track extends Entity<TrackData>{
    constructor(data: Partial<TrackData>) {
        super('Track');
        this.set(data);
    }
}