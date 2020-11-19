import { gql } from "graphql-request";

export const login = gql`
  mutation login_customer($email: String!, $password: String!) {
    login_customer(object: { email: $email, password: $password }) {
      token
      customer {
        id
        name
        email
      }
    }
  }
`;

export const register = gql`
  mutation register_customer(
    $name: String!
    $email: String!
    $password: String!
  ) {
    register_customer(
      object: { email: $email, name: $name, password: $password }
    ) {
      token
      customer {
        id
        name
        email
      }
    }
  }
`;

export const refresh_token = gql`
  mutation refresh_token {
    refresh_token {
      token
      expires_in
      customer {
        id
        name
        email
      }
    }
  }
`;

export const remove_refresh_token = gql`
  mutation remove_refresh_token {
    remove_refresh_token
  }
`;
