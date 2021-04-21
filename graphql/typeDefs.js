const { gql } = require('apollo-server');

module.exports = gql`
type CookingSession {
  id: ID!
  title: String!
  imageUrl: String
  body: String!
  username: String!
  name: String!
  surname: String!
  createdAt: String!
  timeOfStart: String!
  capacity: String!
  url: String!
  ingredients: [String!]
  tools: [String!]
  signedUp: [SignUps]!
  signedCount: Int!
  exp: String!
  other: String
  category: String
  isActive: Boolean!
  isPremium: Boolean!
}

type SignUps {
  id: ID!
  createdAt: String!
  username: String!
  name: String!
  surname: String!
}

type User {
  id: ID!
  email: String!
  name: String!
  surname: String!
  token: String!
  username: String!
  createdAt: String!
}

# type NewUser {
#   id: ID!
#   email: String!
#   name: String!
#   surname: String!
#   token: String!
#   username: String!
#   createdAt: String!
#   imageUrl: String!
#   dateOfBirth: String
#   kitchenSkills: [String]
#   interests: [String]
#   portfolio: [CookingSessionSArchive]!
#   cookingSessions: [CookingSessions]!
#   buddies: [Buddies]!
#   isPremium: Boolean!
#   exp: Number!
#   socialMedia: [SocialMedia]!
# }

input RegisterInput {
  username: String!
  name: String!
  surname: String!
  password: String!
  confirmPassword: String!
  email: String!
}

type Query {
  getSessions: [CookingSession]
  getSession(sessionId: ID!): CookingSession
}

type Mutation {
  register(registerInput: RegisterInput): User!
  login(username: String!, password: String!): User!
  createSession(
    title: String!
    body: String!
    imageUrl: String!
    timeOfStart: String!
    capacity: String!
    url: String!
    ingredients: [String!]
    tools: [String!]
    exp: String!
    other: String
    category: String
    ): CookingSession!
  deleteSession(sessionId: ID!): String!
  modifySession(
    sessionId: ID!
    title: String
    body: String
    imageUrl: String
    timeOfStart: String
    capacity: String
    url: String
    ingredients: [String]
    tools: [String]
    exp: String
    other: String
    category: String
  ): CookingSession!
  joinSession(sessionId: ID!): CookingSession!
  # createComment(postId: ID!, body: String!): Post!
  # deleteComment(postId: ID!, commentId: ID!): Post!
  # likePost(postId: ID!): Post!
}

type Subscription {
  newSession: CookingSession!
}
`;