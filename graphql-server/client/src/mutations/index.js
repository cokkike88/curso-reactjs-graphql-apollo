import gql from 'graphql-tag';

export const createClient = gql`
mutation addClient ($input: InputClient){
    addClient(input: $input){
      id
      name
      lastName
    }
  }`;

  export const editClient = gql `
  mutation updateClient($input: InputClient){
    updateClient(input: $input){
      id
      name
      lastName
      age
      company
      type
      emails {
        email
      }
    }
}`;

export const removeClient = gql`
mutation deleteClient($id:ID!){
  deleteClient(id: $id)
}`;

// PRODUCTS
export const createProduct = gql`
mutation newProduct($input: InputProduct) {
  addProduct(input: $input){  
    name
  }
}`;

export const updateProduct = gql`
  mutation editProduct ($input: InputProduct){
    updateProduct(input: $input){
      id
      name
      price
      stock
    }
  }
`;

export const removeProduct = gql`
mutation removeProduct($id: ID!){
  deleteProduct(id: $id)
}`;