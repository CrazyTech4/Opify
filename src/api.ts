import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';


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
