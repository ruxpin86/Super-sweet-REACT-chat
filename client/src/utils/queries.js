import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allUsers {
    users {
      id
      username
      email
      messages {
        id
        content
      }
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      id
      username
      email
      messages {
        id
        content
      }
      conversations {
        messages
      }
      friendList
    }
  }
`;

export const QUERY_ME = gql`
  query getMe {
    getMe {
      id
      username
      email
      messages {
        username
        id
        content
        conversations {
          id
          title
        }
      }
      conversations {
        id
        title
        members {
          id
          username
        }
      }
      friendList {
        user {
          id
          username
        }
      }
    }
  }
`;

export const QUERY_ALL_MESSAGES = gql`
  query getMessages {
    messages {
      id
      content
      conversations {
        id
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
      id
      title
      messages {
        id
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
      id
      user
    }
  }
`;
