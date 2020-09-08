import { Genre } from "../Database/DownloadQueue/ToBeDownloaded/Genre/genre";

export interface TrackData {
    id: number;
    title: string,

    filepath: string;
    bitrate: number;
    duration: number;
    is_explicit: boolean;
    artist_id: number;
    volume_id: number;

    tidal_id: number;
    release_date: Date;
    genre: Genre;
    genre_id: number;
}