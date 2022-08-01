const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User{
id: ID!
username: String!
email: String!
password: String!
messages: [Messages]
conversations: [Conversations]
friendsList: [FriendList]
}

type Messages{
id: ID!
user: User
content: String!
conversations: [Conversations]
createdAt: Date
}

type Conversations{
id: ID!
messages: [Messages]
members: [User]
}

type FriendList{
id: ID!
users: [User]
}
`