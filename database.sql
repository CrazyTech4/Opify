

DROP DATABASE IF EXISTS lossle;
CREATE DATABASE lossle;
USE lossle;

SET foreign_key_checks = 0;

CREATE TABLE Artist (
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,

    PRIMARY KEY (id),
    FULLTEXT (name)
);

CREATE TABLE Album (
    id BIGINT AUTO_INCREMENT,

    -- indexed from storage
    name TEXT NOT NULL,
    album_cover_filepath TEXT NOT NULL,
    artist_id BIGINT NOT NULL,
    
    -- data from tidal
    tidal_id BIGINT,
    release_date DATE,

    PRIMARY KEY (id),
    FOREIGN KEY (artist_id) REFERENCES Artist(id),
    FULLTEXT (name)
);

CREATE TABLE SimilarAlbum (
    id BIGINT AUTO_INCREMENT,

    album1_id BIGINT NOT NULL,
    album2_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (album1_id) REFERENCES Album(id),
    FOREIGN KEY (album2_id) REFERENCES Album(id)
);

CREATE TABLE Volume (
    id BIGINT AUTO_INCREMENT,

    -- indexed from storage
    part INT NOT NULL,
    album_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (album_id) REFERENCES Album(id)
);

-- fetched from tidal
CREATE TABLE Genre (
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE SimilarGenre (
    id BIGINT AUTO_INCREMENT,

    genre1_id BIGINT NOT NULL,
    genre2_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (genre1_id) REFERENCES Genre(id),
    FOREIGN KEY (genre2_id) REFERENCES Genre(id)
);

CREATE TABLE Track (
    id BIGINT AUTO_INCREMENT,
    title TEXT NOT NULL,
    
    -- maybe not downloaded, yet
    filepath TEXT,
    bitrate INT,
    duration INT, -- in seconds
    is_explicit BOOLEAN,
    volume_id BIGINT,
    -- thumbnail is in the file (could use albumcover though)
    
    -- info needs to be fetched from tidal
    tidal_id BIGINT,
    release_date DATE,
    genre_id BIGINT,

    PRIMARY KEY (id),
    FOREIGN KEY (volume_id) REFERENCES Volume(id),
    FOREIGN KEY (genre_id) REFERENCES Genre(id),
    FULLTEXT (title)
);

CREATE TABLE SimilarTrack (
    id BIGINT AUTO_INCREMENT,

    track1_id BIGINT NOT NULL,
    track2_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (track1_id) REFERENCES Track(id),
    FOREIGN KEY (track2_id) REFERENCES Track(id)
);

CREATE TABLE JoinTable_TrackGenre (
    id BIGINT AUTO_INCREMENT,
    
    track_id BIGINT NOT NULL,
    genre_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (track_id) REFERENCES Track(id),
    FOREIGN KEY (genre_id) REFERENCES Genre(id)
);

-- indexed by storage
CREATE TABLE Feature (
    id BIGINT AUTO_INCREMENT,

    track_id BIGINT NOT NULL,
    artist_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (track_id) REFERENCES Track(id),
    FOREIGN KEY (artist_id) REFERENCES Artist(id)
);

CREATE TABLE User (
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password_hash TEXT NOT NULL,

    favorite_playlist_id BIGINT,

    PRIMARY KEY (id),
    FOREIGN KEY (favorite_playlist_id) REFERENCES Playlist(id)
);


CREATE TABLE APIApplication (
    id BIGINT AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    client_id TEXT NOT NULL,
    scope TEXT,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE UserTwoFactorAuth (
    id BIGINT AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    secret_code TEXT NOT NULL,
    application_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (application_id) REFERENCES APIApplication(id)
);

-- CREATE TABLE UserAccessProcess (
--     -- ... wip
-- );

CREATE TABLE UserAccess (
    id BIGINT AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    access_token TEXT NOT NULL,
    reload_token TEXT NOT NULL,
    authentication_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (authentication_id) REFERENCES UserTwoFactorAuth(id)
);

CREATE TABLE Playlist (
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    is_private BOOLEAN NOT NULL,
    owner_id BIGINT NOT NULL,
    
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES User(id),
    FULLTEXT (name)
);

CREATE TABLE JoinTable_PlaylistTrack (
    id BIGINT AUTO_INCREMENT,

    track_id BIGINT NOT NULL,
    playlist_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (track_id) REFERENCES Track(id),
    FOREIGN KEY (playlist_id) REFERENCES Playlist(id)
);

CREATE TABLE JoinTable_PlaylistFollow (
    id BIGINT AUTO_INCREMENT,

    user_id BIGINT NOT NULL,
    playlist_id BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (playlist_id) REFERENCES Playlist(id)
);


CREATE TABLE DownloadPriority (
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    priority INT NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE ToBeDownloaded (
    id BIGINT AUTO_INCREMENT,
    track_id BIGINT NOT NULL,
    priority_id BIGINT NOT NULL,
    request_time TIMESTAMP NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (priority_id) REFERENCES DownloadPriority(id)
);



INSERT INTO DownloadPriority (name, priority)
VALUES ('currently_playing', 4),
       ('user_liked_tracks', 3),
       ('private_playlist', 2),
       ('public_playlist', 1);

INSERT INTO Artist (name)
VALUES ('Thilo'),
       ('Lukas'),
       ('Gerrit');

INSERT INTO Album (name, album_cover_filepath, artist_id)
VALUES ('Brumm', '', 1),
       ('Summ', '', 1),
       ('Yeet!', '', 2),
       ('Auf gehts', '', 2);

INSERT INTO Volume (part, album_id)
VALUES (1, 1),
       (1, 2);

INSERT INTO Track (title, volume_id)
VALUES ('Lalala', 1),
       ('Blub', 1),
       ('Yolodido', 2),
       ('Schmeckt mir', 2);

INSERT INTO User (name, email, password_hash)
VALUES ('Thilo', 'thilo@krass.de', 'ABC'),
       ('Lukas', 'lukas@krass.de', 'ABC'),
       ('Gerrit', 'gerrit@krass.de', 'ABC');

INSERT INTO Playlist (name, is_private, owner_id)
VALUES ('Playlist 1', 0, 1),
       ('Playlist 2', 0, 2),
       ('Playlist 3', 0, 3);

INSERT INTO JoinTable_PlaylistTrack (playlist_id, track_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (2, 1),
       (2, 3),
       (3, 1);


SET foreign_key_checks = 1;