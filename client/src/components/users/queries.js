import gql from 'graphql-tag';

export const usersQuery = gql`
  query allUsers {
    users {
      id
      email
      name
    }
  }
`;

export const createUserMutation = gql`
  mutation createUser($email: String!, $name: String!) {
    createUser(email: $email, name: $name) {
      id
      name
      email
    }
  }
`;

export const destroyUserMutation = gql`
  mutation destroyUser($id: Int!) {
    destroyUser(id: $id) {
      id
    }
  }
`;
