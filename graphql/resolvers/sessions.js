const { AuthenticationError, UserInputError } = require('apollo-server');

const CookingSession = require('../../models/CookingSession');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getSessions() {
      try {
        const sessions = await CookingSession.find().sort({ createdAt: -1 });
        return sessions;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getSession(_, { sessionId }) {
      try {
        const session = await CookingSession.findById(sessionId);
        if (session) {
          return session;
        } else {
          throw new Error('Cooking Session not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },

  Mutation: {
    async createSession(_, { title, imageUrl, body, timeOfStart, capacity, url, ingredients, tools, exp, other, category }, context) {
      const user = checkAuth(context);

      if (title.trim() === '') {
        throw new Error(`Cooking Session title must not be empty`);
      }

      if (body.trim() === '') {
        throw new Error(`Cooking Session body must not be empty`);
      }

      if (timeOfStart.trim() === '') {
        throw new Error(`Cooking Session start time must not be empty`);
      }

      if (capacity === '') {
        throw new Error(`Cooking Session capacity must not be empty`);
      }

      if (url.trim() === '') {
        throw new Error(`Cooking Session meeting url must not be empty`);
      }

      if (ingredients.length < 1) {
        throw new Error(`Cooking Session ingredients list must not be empty`);
      }

      if (tools.length < 1) {
        throw new Error(`Cooking Session kitchen tools list must not be empty`);
      }

      if (exp.trim() === '') {
        throw new Error(`Cooking Session experience must not be empty`);
      }

      const newSession = new CookingSession({
        title,
        imageUrl,
        body,
        user: user.id,
        username: user.username,
        name: user.name,
        surname: user.surname,
        createdAt: new Date().toISOString(),
        timeOfStart,
        capacity,
        url,
        ingredients,
        tools,
        exp,
        other,
        category,
        isActive: true,
        isPremium: false
      });

      const session = await newSession.save();

      context.pubsub.publish('NEW_COOKING_SESSION', {
        newSession: session
      })

      return session;
    },

    async deleteSession(_, { sessionId }, context) {
      const user = checkAuth(context);
      try {
        const session = await CookingSession.findById(sessionId);
        if (user.username === session.username) {
          await session.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async modifySession(_, { sessionId, title, imageUrl, body, timeOfStart, capacity, url, ingredients, tools, exp, other, category }, context) {
      const user = checkAuth(context);
      try {
        const session = await CookingSession.findById(sessionId);

        // to poprawić
        if (user.username === session.username) {

          await session.updateOne({
            title,
            imageUrl,
            body,
            user: user.id,
            username: user.username,
            name: user.name,
            surname: user.surname,
            createdAt: new Date().toISOString(),
            timeOfStart,
            capacity,
            url,
            ingredients: session.ingredients,
            tools,
            exp,
            other,
            category,
            isActive: true,
            isPremium: false
          })

          // const session = await newSession.save();

          // context.pubsub.publish('EDIT_COOKING_SESSION', {
          //   newSession: session
          // })

          return session;
          // do tego miejsca
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async joinSession(_, { sessionId }, context) {
      const { username, name, surname } = checkAuth(context);

      const session = await CookingSession.findById(sessionId);
      if (session) {
        if (session.signedUp.find(singUp => singUp.username === username)) {
          // post already liked, unlike it
          session.signedUp = session.signedUp.filter(singUp => singUp.username !== username);
        } else {
          // not liked, like post
          session.signedUp.push({
            username,
            name,
            surname,
            createdAt: new Date().toISOString()
          })
        }
        await session.save();
        return session;
      } else throw new UserInputError('Post not found');
    }
  },

  Subscription: {
    newSession: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_COOKING_SESSION')
    }
  }
};