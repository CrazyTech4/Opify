import { Entity } from "../../../repository";
import { GenreData } from "./genre-data";


export class Genre extends Entity<GenreData>{
    constructor(data: Partial<GenreData>) {
        super('Genre');
        this.set(data);
    }
}