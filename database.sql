CREATE DATABASE opify;
USE opify;



CREATE TABLE Artist (
    id BIGINT NOT NULL,
    name VARCHAR(40) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE Album (
    id BIGINT NOT NULL,
    name VARCHAR(40) NOT NULL,

    artist BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (album) REFERENCES Album(id)
);

CREATE TABLE Genre (
    id BIGINT NOT NULL,
    name VARCHAR(40) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE Track (
    id BIGINT NOT NULL,
    name VARCHAR(40) NOT NULL,

    artist BIGINT,
    album BIGINT,
    genre BIGINT,

    PRIMARY KEY (id),
    FOREIGN KEY (artist) REFERENCES Artist(id),
    FOREIGN KEY (album) REFERENCES Album(id),
    FOREIGN KEY (genre) REFERENCES Genre(id),
);




CREATE TABLE User (
    id BIGINT NOT NULL,
    name VARCHAR(40) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password_hash TEXT NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE Playlist (
    id BIGINT NOT NULL,
    name VARCHAR(40) NOT NULL,

    user BIGINT NOT NULL,
    
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES User(id)
);

CREATE TABLE JoinTable_PlaylistTrack (
    id BIGINT NOT NULL,

    track BIGINT NOT NULL,
    playlist BIGINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (tracker) REFERENCES Tracker(id),
    FOREIGN KEY (playlist) REFERENCES Playlist(id)
);