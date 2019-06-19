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

// ORDERS
export const createOrder = gql`
  mutation newOrder($input : InputOrder){
    addOrder(input: $input){
      id
    }
  }
`;

export const removeProduct = gql`
mutation removeProduct($id: ID!){
  deleteProduct(id: $id)
}`;

export const editOrderStatus = gql`
  mutation editOrderStatus($input: InputOrder){
    updateOrderStatus(input: $input)
  }
`;

// USERS
export const createUser = gql `
  mutation addUser($user: String!, $name: String, $pass: String!, $role: String){
    createUser(user: $user, name: $name, pass: $pass, role: $role)
  }
`;

export const login = gql`
  mutation login ($user: String!, $pass: String!){
    authUser(user:$user, pass:$pass){
      token
    }
  }
`;