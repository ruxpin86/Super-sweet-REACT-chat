import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
        password
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($input: MessageInput, $userId: ID, $username: String) {
    addMessage(input: $input, userId: $userId, username: $username) {
      id
      content
      username
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($input: FriendInput, $userId: ID) {
    addFriend(input: $input, userId: $userId) {
      id
      user
    }
  }
`;
