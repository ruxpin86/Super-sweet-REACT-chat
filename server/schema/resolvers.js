const { AuthenticationError } = require("apollo-server-express");

const { User, Messages, Conversations, FriendList } = require("../models");

const { signToken } = require("../utils/auth");
const { ObjectId } = require("mongoose").Types;

const resolvers = {
  Query: {
    allUsers: async () => {
      return User.find();
    },

    singleUser: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    getMe: async (parent, args, context) => {
      if (context.user) {
        // return User.findOne({ _id: context.user._id });
        const currentUser = await User.findOne({ _id: context.user._id });
        console.log(currentUser);
        return currentUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    getMessages: async () => {
      return Messages.find();
    },

    getConversations: async () => {
      return Conversations.find();
    },

    getFriends: async () => {
      return FriendList.find();
    },

    getFriendById: async (parent, { userId }) => {
      console.log(`friend's ID is ${userId}`);
      return User.findOne({ _id: userId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      console.log("backend", { username, email, password });
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password! Please try again!");
      }

      const token = signToken(user);
      return { token, user };
    },

    addMessage: async (parent, { userId, input }, context) => {
      console.log(`userId value is ${userId}`);
      console.log(`Input value is ${input}`);
      if (context.user) {
        try {
          const message = await Messages.create(input);
          const updatedUser = await User.findByIdAndUpdate(
            { _id: userId },
            { $push: { messages: message } },
            {
              new: true,
              runValidators: true,
            }
          );
          console.log(message);
          return { message, updatedUser };
        } catch (err) {
          console.error(err);
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addFriend: async (parent, { userId, input }, context) => {
      console.log(`userId value is ${userId}`);
      console.log(`Input value is ${input}`);
      if (context.user) {
        try {
          const addFriend = await FriendList.create(input);
          const updatedUser = await User.findByIdAndUpdate(
            { _id: userId },
            { $push: { friendList: addFriend } },
            {
              new: true,
              runValidators: true,
            }
          );
          console.log(addFriend);
          return { addFriend, updatedUser };
        } catch (err) {
          console.error(err);
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
