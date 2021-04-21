const { model, Schema } = require('mongoose');

const sessionSchema = new Schema({
  title: String,
  imageUrl: String,
  body: String,
  username: String,
  name: String,
  surname: String,
  createdAt: String,
  timeOfStart: String,
  capacity: String,
  url: String,
  ingredients: [String],
  tools: [String],
  other: String,
  category: String,
  exp: String,
  signedUp: [
    {
      username: String,
      name: String,
      surname: String,
      createdAt: String
    }
  ],
  isActive: Boolean,
  isPremium: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('CookingSession', sessionSchema);