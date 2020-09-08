
DROP DATABASE IF EXISTS opify;
CREATE DATABASE opify;
USE opify;



CREATE TABLE Artist (
    id BIGINT NOT NULL,
    name VARCHAR(40) NOT NULL,

    PRIMARY KEY (id),
    FULLTEXT (name)
);

CREATE TABLE Album (
    id BIGINT NOT NULL,

    -- indexed from storage
    name TEXT NOT NULL,
    album_cover_filepath TEXT NOT NULL,
    artist_id BIGINT NOT NULL,
    
    -- data from last.fm
    last_fm_id BIGINT,
    release_date DATE,

    PRIMARY KEY (id),
    FOREIGN KEY (album_id) REFERENCES Album(id),
    FULLTEXT (name)
);

CREATE TABLE SimilarAlbum (
    id BIGINT NOT NULL,

    album1_id BIGINT NOT NULL,
    album2_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (album1_id) REFERENCES Album(id),
    FOREIGN KEY (album2_id) REFERENCES Album(id)
);

CREATE TABLE Volume (
    id BIGINT NOT NULL,

    -- indexed from storage
    name VARCHAR(40) NOT NULL,
    part INT NOT NULL,
    album_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (album_id) REFERENCES Album(id),
);

-- fetched from last.fm
CREATE TABLE Genre (
    id BIGINT NOT NULL,
    name VARCHAR(40) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE SimilarGenre (
    id BIGINT NOT NULL,

    genre1_id BIGINT NOT NULL,
    genre2_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (genre1_id) REFERENCES Genre(id),
    FOREIGN KEY (genre2_id) REFERENCES Genre(id)
);

CREATE TABLE Track (
    id BIGINT NOT NULL,
    title TEXT NOT NULL,
    
    -- maybe not downloaded, yet
    filepath TEXT,
    bitrate INT,
    duration INT, -- in seconds
    is_explicit BOOLEAN,
    artist_id BIGINT,
    volume_id BIGINT,
    -- thumbnail is in the file (could use albumcover though)
    
    -- info needs to be fetched from last.fm
    last_fm_id BIGINT,
    release_date DATE,
    genre_id BIGINT,

    PRIMARY KEY (id),
    FOREIGN KEY (artist_id) REFERENCES Artist(id),
    FOREIGN KEY (volume_id) REFERENCES Volume(id),
    FOREIGN KEY (genre_id) REFERENCES Genre(id),
    FULLTEXT (title)
);

CREATE TABLE SimilarTrack (
    id BIGINT NOT NULL,

    track1_id BIGINT NOT NULL,
    track2_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (track1_id) REFERENCES Track(id),
    FOREIGN KEY (track2_id) REFERENCES Track(id)
);

CREATE TABLE JoinTable_TrackGenre (
    id BIGINT NOT NULL,
    
    track_id BIGINT NOT NULL,
    genre_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (track_id) REFERENCES Track(id),
    FOREIGN KEY (genre_id) REFERENCES Genre(id),
);

-- indexed by storage
CREATE TABLE Feature (
    id BIGINT NOT NULL,

    track_id BIGINT NOT NULL,
    artist_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (track_id) REFERENCES Track(id),
    FOREIGN KEY (artist_id) REFERENCES Artist(id)
);

CREATE TABLE User (
    id BIGINT NOT NULL,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password_hash TEXT NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE APIApplication (
    id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    client_id TEXT NOT NULL,
    scope TEXT DEFAULT 'any',

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES User(id),
)

CREATE TABLE UserTwoFactorAuth (
    id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    secret_code TEXT NOT NULL,
    application_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (application_id) REFERENCES APIApplication(id),
)

CREATE TABLE UserAccessProcess (
    -- ... wip
);

CREATE TABLE UserAccess (
    id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    access_token TEXT NOT NULL,
    reload_token TEXT NOT NULL,
    authentication_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (authentication_id) REFERENCES UserTwoFactorAuth(id),
);

CREATE TABLE Playlist (
    id BIGINT NOT NULL,
    name VARCHAR(40) NOT NULL,
    owner_id BIGINT NOT NULL,
    
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES User(id),
    FULLTEXT (name)
);

CREATE TABLE JoinTable_PlaylistTrack (
    id BIGINT NOT NULL,

    track_id BIGINT NOT NULL,
    playlist_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (track_id) REFERENCES Track(id),
    FOREIGN KEY (playlist_id) REFERENCES Playlist(id)
);

CREATE TABLE JoinTable_PlaylistFollow (
    id BIGINT NOT NULL,

    user_id BIGINT NOT NULL,
    playlist_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (playlist_id) REFERENCES Playlist(id)
);

-- queues needed