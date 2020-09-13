import 'reflect-metadata'; // important for type-graphql
import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi/Container';
import { ArtistResolver } from './Database/Artist/artist.resolver';
import { AlbumResolver } from './Database/Album/album.resolver';
import { TrackResolver } from './Database/Track/track.resolver';
import { VolumeResolver } from './Database/Volume/volume.resolver';
import { PlaylistResolver } from './Database/Playlist/playlist.resolver';
import { UserResolver } from './Database/User/user.resolver';
import { SessionResolver } from './Database/Session/session.resolver';
import { QueueResolver } from './Database/Queue/queue.resolver';

// TODO: use the Database Entities and represent them here
// The GraphQL Schemas should be created as seperate files in the Database folder
// https://stackoverflow.com/questions/43594675/gql-or-graphql-file-types-with-node
// example schmea is in ./Database/Genre/genre.graphql


(async () => {

  const app = express();
  
  var schema = await buildSchema({
    resolvers: [
      ArtistResolver,
      AlbumResolver,
      TrackResolver,
      VolumeResolver,
      UserResolver,
      PlaylistResolver,
      UserResolver,
      SessionResolver,
      QueueResolver
    ],
    container: Container
  });
  
  
  app.use('/graphql', graphqlHTTP({
      schema: schema,
      graphiql: true,
  }));
  
  app.listen(8080, null, () => {
      console.log('api running at localhost:8080/graphql');
  });

})();


function toSnakeCase(name: string) {
  return name.replace(/[A-Z]/g, (substring: string, ...args: any[]) => {
      return '_' + substring.toLowerCase();
  });
}