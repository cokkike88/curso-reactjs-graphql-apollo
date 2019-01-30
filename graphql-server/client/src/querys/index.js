import gql from 'graphql-tag';

export const clients_query = gql`{
    getClients{
        id
        name
        lastName
        company
    }
}`;

export const findClient = gql`
    query findClient ($id:ID){
        getClient(id: $id){
            id
            name
            lastName
            company
            age
            type
            emails {
                email
            }
        }
    }
`;