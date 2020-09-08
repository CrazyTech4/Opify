import { Entity } from "../repository";
import { DownloadPriorityData } from "./priority-data";


export class DownloadPriority extends Entity<DownloadPriorityData>{
    constructor(data: Partial<DownloadPriorityData>) {
        super('DownloadPriority');
        this.set(data);
    }
}