import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

// TODO: use the Database Entities and represent them here
// The GraphQL Schemas should be created as seperate files in the Database folder
// https://stackoverflow.com/questions/43594675/gql-or-graphql-file-types-with-node
// example schmea is in ./Database/Genre/genre.graphql


const app = express();

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = {
    hello: () => {
      return 'Hello world!';
    },
  };

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(8080, null, () => {
    console.log('api running at localhost:8080/graphql');
});
