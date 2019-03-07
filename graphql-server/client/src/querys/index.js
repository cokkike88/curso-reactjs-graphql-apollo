import gql from 'graphql-tag';

// CLIENTS
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

// PRODUCTS
export const products_query = gql`
    query ($limit: Int, $offset: Int){
        getProducts(limit: $limit, offset: $offset){
            id
            name
            price
            stock
        }
        totalProducts
    }
`;
export const findProduct = gql`
    query getProduct($id: ID){
        getProduct(id: $id){
        name
        price
        stock
        }
    } 
`;