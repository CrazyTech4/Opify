
export interface TrackData {
    id: number;
    title: string,

    filepath: string;
    bitrate: number;
    duration: number;
    is_explicit: boolean;
    artist_id: number;
    volume_id: number;

    last_fm_id: number;
    release_date: Date;
    genre_id: number;
}