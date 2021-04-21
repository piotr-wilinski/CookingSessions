const sessionsResolvers = require('./sessions')
const usersResolvers = require('./users')
// const commentsResolvers = require('./comments')

module.exports = {
  CookingSession: {
    signedCount: (parent) => parent.signedUp.length,
    // commentsCount: (parent) => parent.comments.length
  },
  Query: {
    ...sessionsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...sessionsResolvers.Mutation,
    // ...commentsResolvers.Mutation
  },
  Subscription: {
    ...sessionsResolvers.Subscription
  }
}