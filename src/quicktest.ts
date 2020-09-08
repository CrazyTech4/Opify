import { Database } from "./Database/database.class";
import { Genre } from "./Database/Genre/genre";
import { Playlist } from "./Database/Playlist/playlist";
import { User } from "./Database/User/user";
import { Track } from "./Database/Track/track";

(async () => {
    await Database.execute('DELETE FROM Track;');
    await Database.execute('DELETE FROM Genre;');
    await Database.execute('UPDATE User SET favorite_playlist_id=NULL;');
    await Database.execute('DELETE FROM Playlist;');
    await Database.execute('DELETE FROM User;');

    const genre = new Genre({
        name: 'Pop'
    });

    await genre.insert();

    const track = new Track({
        title: 'Ein Test Track',
        filepath: 'c:\\cool',
        genre: genre
    });

    await track.insert();

    const user = new User({
        name: 'olli',
        email: 'ollis@werkzeug-shop.de',
        password_hash: 'ABC'
    });

    await user.insert();

    const playlist = new Playlist({
        name: 'Favoritenliste',
        is_private: false,
        owner: user
    });

    await playlist.insert();

    user.set({
        favorite_playlist: playlist
    });

    await user.update();

    await Database.disconnect();
})();


