

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
    isrc VARCHAR(12),
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
    isrc VARCHAR(12),
    release_date DATE,

    PRIMARY KEY (id),
    FOREIGN KEY (volume_id) REFERENCES Volume(id),
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

-- indexed by storage
CREATE TABLE TrackFeature (
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

CREATE TABLE UserSession (
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    user_id BIGINT NOT NULL,
    access_token TEXT NOT NULL,
    reload_token TEXT NOT NULL,
    current_queue_id BIGINT,

    PRIMARY KEY (id),
    UNIQUE (access_token),
    UNIQUE (reload_token),
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (current_queue_id) REFERENCES TemporaryQueue(id)
);

CREATE TABLE Playlist (
    id BIGINT AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    is_private BOOLEAN NOT NULL,
    owner_id BIGINT,
    
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


CREATE TABLE TemporaryQueue (
    id BIGINT AUTO_INCREMENT,

    playlist_id BIGINT NOT NULL,
    playing_session_id BIGINT NOT NULL,
    
    playing BOOLEAN NOT NULL,
    current_track_index INT NOT NULL, -- playlist index
    current_audio_position INT NOT NULL, -- in seconds 
    last_update TIMESTAMP NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (playlist_id) REFERENCES Playlist(id),
    FOREIGN KEY (playing_session_id) REFERENCES UserSession(id)
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

INSERT INTO TrackFeature (track_id, artist_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (2, 2);

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

INSERT INTO JoinTable_PlaylistFollow (user_id, playlist_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (2, 1),
       (2, 3),
       (3, 1);

INSERT INTO UserSession (name, user_id, access_token, reload_token)
VALUES ('Smartphone', 1, 'ABC', 'ABC'),
       ('Smartphone', 2, 'ABC', 'ABC'),
       ('Smartphone', 3, 'ABC', 'ABC'),
       ('Laptop', 3, 'ABC', 'ABC');

INSERT INTO TemporaryQueue (playlist_id, playing_session_id, playing, current_track_index, current_audio_position, last_update)
VALUES (1, 1, 1, 1, 0, CURRENT_TIMESTAMP);

UPDATE UserSession SET current_queue_id=1;




SET foreign_key_checks = 1;