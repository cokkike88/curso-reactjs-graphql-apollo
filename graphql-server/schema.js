import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Client {
        id: ID
        name: String
        lastName: String
        company: String
        emails: [Email]
        age: Int
        type: ClientType
        orders: [Order]
    }
    type Order {
        product: String
        price: Float
    }
    type Email {
        email: String
    }
    enum ClientType {
        BASIC
        PREMIUM
    }
    type Query {
        getClient(id: ID): Client
    }
    input InputOrder {
        product: String
        price: Float
    }
    input InputEmail {
        email: String
    }
    """ Campos para los clientes nuevos """
    input InputClient {
        id: ID
        name: String!
        lastName: String!
        company: String!
        emails: [InputEmail]!
        age: Int!
        type: ClientType!
        orders: [InputOrder]!
    }
    """ Mutation para crear nuevos clientes """
    type Mutation {      
        # Nombre del resolver, Input con datos y valor que retorna  
        """ Permite crear nuevos clientes """
        addClient(input: InputClient): Client
    }
`);

export default schema;
