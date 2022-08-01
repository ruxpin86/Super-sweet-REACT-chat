import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
      messages
      conversations
      friendsList
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      messages
      conversations
      friendsList
    }
  }
`;

export const QUERY_ME = gql`
  query getMe {
    getMe {
      _id
      username
      email
      messages {
        _id
        content
        user
        conversations
        createdAt
      }
      conversations {
        _id
        messages
        members
      }
      friendsList {
        _id
        users
        content
      }
    }
  }
`;

export const QUERY_ALL_MESSAGES = gql`
  guery getMessages {
    messages{
      _id
      content
      conversations{
        _id
        messages
        members
      }
      createdAt
      user
    }
  }
`;

export const QUERY_ALL_CONVERSATIONS = gql`
  guery getConversations {
    conversations{
      _id
      messages{
        _id
        context
        createdAt
        user
      }
      members
    }
  }
`;

export const QUERY_ALL_FRIENDS = gql`
  guery getFriends {
    friendList{
      _id
      users
      content
    }
  }
`;
