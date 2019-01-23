import gql from 'graphql-tag';

export const createClient = gql`
mutation addClient ($input: InputClient){
    addClient(input: $input){
      id
      name
      lastName
    }
  }`;