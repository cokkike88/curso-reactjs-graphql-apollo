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
    query ($limit: Int, $offset: Int, $stock: Boolean){
        getProducts(limit: $limit, offset: $offset, stock: $stock){
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

// ORDERS
export const getOrders = gql`
    query getOrdersByClient ($clientId: String){
        getOrders(clientId: $clientId){
            id
            orders{
            id
            quantity
            }
            total
            date            
            status
        }
    }
`;

// GRAFICAS
export const getTopClients = gql`
    query GetTopClients {
        topClients{
            total
            client {
            name
            
            }
        }
    }
`;