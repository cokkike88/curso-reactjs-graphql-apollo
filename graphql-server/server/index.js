import express from 'express';
// LA NO SE UTILIZA POR QUE SE UTILIZARA APOLLO
// GRAPHQL
// import graphqlHTTP from 'express-graphql';
import { ApolloServer } from 'apollo-server-express';
// import { schema } from './data/schema';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({path: 'variables.env'});
// RESOLVERS
// import resolvers from './data/resolvers';

// const root = resolvers;
const app = express();


const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    // Recibe el token
    context: async({req}) => {
        const token = req.headers['authorization'];
        // console.log('TOKEN', token);

        if(token !== "null"){
            try{
                const currentUser = await jwt.verify(token, process.env.SECRET);
                req.currentUser = currentUser;
                console.log('currentUser', currentUser);

                return {
                    currentUser
                }
            }
            catch(error){
                console.error('Error al verificar el token', error);
            }
        }
    } 
});

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