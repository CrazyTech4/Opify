import { Playlist } from "../Playlist/playlist";


export interface UserData {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    favorite_playlist: Playlist;
}