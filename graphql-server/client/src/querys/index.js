import gql from 'graphql-tag';

export const clients_query = gql`
    query getClients($limit: Int, $offset: Int){
        getClients(limit: $limit, offset: $offset){
            id
            name
            lastName
            company
        }
        totalClients
    }
`;

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