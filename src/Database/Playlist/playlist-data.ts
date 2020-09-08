import { User } from "../User/user";


export interface PlaylistData {
    id: number;
    name: string;
    is_private: boolean;
    owner: User;
    owner_id: number;
}