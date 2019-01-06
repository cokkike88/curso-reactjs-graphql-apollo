import express from 'express';
// GRAPHQL
import graphqlHTTP from 'express-graphql';
import { schema } from './data/schema';
// RESOLVERS
// import resolvers from './data/resolvers';

// const root = resolvers;
const app = express();

app.get('/', (req, res) => {
    res.send('Todo listo');
})





app.use('/graphql', graphqlHTTP ({
    // QUE ESQUEMA VA A UTILIZAR 
    schema,
    // LOS DATOS SE PASAN COMO rootValue
    // rootValue: root,
    // UTILIZAR graphiql
    graphiql: true
}))

app.listen(8000, () => console.log('El servidor esta funcionando'));