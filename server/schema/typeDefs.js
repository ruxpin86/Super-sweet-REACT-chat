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
    content: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input MessageInput {
    content: String!
  }

  input FriendInput {
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

    addFriend(userId: ID, input: FriendInput): FriendList
  }
`;

module.exports = typeDefs;
