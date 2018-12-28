import express from 'express';
// GRAPHQL
import graphqlHTTP from 'express-graphql';
import schema from './schema';


const app = express();

app.get('/', (req, res) => {
    res.send('Todo listo');
})

// RESOLVER
const root = {
    client: ()=> {
        return {
            "id": 36546546,
            "name": "Oscar",
            "lastName": "Munoz",
            "company": "oeml",
            "emails": "email@gmail.com"
        }
    }
};

app.use('/graphql', graphqlHTTP ({
    // QUE ESQUEMA VA A UTILIZAR 
    schema,
    // LOS DATOS SE PASAN COMO rootValue
    rootValue: root,
    // UTILIZAR graphiql
    graphiql: true
}))

app.listen(8000, () => console.log('El servidor esta funcionando'));