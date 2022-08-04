import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
      messages
      conversations
      friendList
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
      friendList
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
      }
      conversations {
        _id
        title
        messages
        members
      }
      friendList {
        _id
        user
      }
    }
  }
`;

export const QUERY_ALL_MESSAGES = gql`
  query getMessages {
    messages {
      _id
      content
      conversations {
        _id
        title
        messages
        members
      }
      createdAt
      user
    }
  }
`;

export const QUERY_ALL_CONVERSATIONS = gql`
  query getConversations {
    conversations {
      _id
      title
      messages {
        _id
        content
        createdAt
        user
      }
      members
    }
  }
`;

export const QUERY_ALL_FRIENDS = gql`
  query getFriends {
    friendList {
      _id
      user
    }
  }
`;
