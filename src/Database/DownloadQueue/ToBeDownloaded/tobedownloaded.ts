import { Entity } from "../../repository";
import { ToBeDownloadedData } from "./tobedownloaded-data";



export class ToBeDownloaded extends Entity<ToBeDownloadedData>{
    constructor(data: Partial<ToBeDownloadedData>) {
        super('ToBeDownloaded');
        this.set(data);
    }
}