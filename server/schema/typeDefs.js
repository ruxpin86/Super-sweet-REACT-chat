const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    username: String
    email: String
    password: String
    messages: [Messages]
    conversations: [Conversations]
    friendList: [FriendList]
  }

  type Messages {
    id: ID
    user: User
    content: [String]
    conversations: Conversations
    #createdAt: Date!
  }

  type Conversations {
    id: ID
    title: String
    messages: [Messages]
    members: [User]
  }

  type FriendList {
    id: ID
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  input MessageInput {
    content: String
  }

  input FriendInput {
    user: String
  }

  type Query {
    allUsers: [User]!

    singleUser(userId: ID!): User

    getMe: User

    getMessages: [Messages]

    getConversations: [Conversations]

    getFriends: [FriendList]!

    getFriendById(userId: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    addMessage(userId: ID, input: MessageInput): Messages

    addFriend(userId: ID, input: FriendInput): FriendList
  }
`;

module.exports = typeDefs;
