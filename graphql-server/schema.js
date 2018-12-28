import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Client {
        id: ID
        name: String
        lastName: String
        company: String
        emails: String
    }
    type Email {
        email: String
    }
    type Query {
        client: Client
    }
    input InputClient {
        id: ID
        name: String
        lastName: String
        company: String
        emails: String
    }
    type Mutation {
        addCliente(input: InputClient): Client
    }
`);

export default schema;
