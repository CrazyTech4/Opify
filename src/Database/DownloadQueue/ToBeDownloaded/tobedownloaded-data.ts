import { Track } from "../../../Track/track";
import { DownloadPriority } from "./Priority/priority";

export interface ToBeDownloadedData {
    id: number;
    track: Track;
    track_id: number;
    priority: DownloadPriority;
    priority_id: number;
    request_time: Date;
}