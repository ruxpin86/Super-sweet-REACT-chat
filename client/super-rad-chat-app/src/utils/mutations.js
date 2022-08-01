import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
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
        _id
        username
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($input: MessageInput, $userId: ID) {
    addMessage(input: $input, userId: $userId) {
      _id
      content
      conversations
      createdAt
      user
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($input: FriendInput, $userId: ID) {
    addFriend(input: $input, userId: $userId) {
      _id
      users
      content
    }
  }
`;
