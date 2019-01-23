import express from 'express';
// LA NO SE UTILIZA POR QUE SE UTILIZARA APOLLO
// GRAPHQL
// import graphqlHTTP from 'express-graphql';
import { apolloServer, ApolloServer } from 'apollo-server-express';
// import { schema } from './data/schema';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';
// RESOLVERS
// import resolvers from './data/resolvers';

// const root = resolvers;
const app = express();


const server = new ApolloServer({typeDefs, resolvers});

server.applyMiddleware({app});

app.listen(4000, () => console.log('El servidor esta funcionando http://localhost:4000'+ server.graphqlPath));

// app.get('/', (req, res) => {
//     res.send('Todo listo');
// })





// app.use('/graphql', graphqlHTTP ({
//     // QUE ESQUEMA VA A UTILIZAR 
//     schema,
//     // LOS DATOS SE PASAN COMO rootValue
//     // rootValue: root,
//     // UTILIZAR graphiql
//     graphiql: true
// }))

// app.listen(8000, () => console.log('El servidor esta funcionando'));