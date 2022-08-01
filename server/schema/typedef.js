const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    messages: [Messages]
    conversations: [Conversations]
    friendsList: [FriendList]
  }

  type Messages {
    id: ID!
    user: User
    content: String!
    conversations: [Conversations]
    createdAt: Date
  }

  type Conversations {
    id: ID!
    messages: [Messages]
    members: [User]
  }

  type FriendList {
    id: ID!
    users: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  input MessageInput {
    content: String!
  }

  type Query {
    allUsers: [User]!

    singleUser(userId: ID!): User

    getMe: User

    getMessages: [Messages]!

    getConversations: [Conversations]!

    getFriends: [FriendList]!

    getFriendById(friendId: ID!): FriendList
  }

  type Mutations {
    addUser(username: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    removeUser: User

    addMessage(userId: ID, input: MessageInput): Messages

    addFriend(friendId: ID): FriendList
  }
`;
