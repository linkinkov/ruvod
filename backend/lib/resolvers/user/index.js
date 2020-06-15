/* eslint-disable no-unused-vars */
const User = require('../../models/user');

const Query = {
  user: async (_, { id }, ctx) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (err) {
      ctx.logger.error(err.message);
      return new Error('User was not find');
    }
  },
  users: async (_, { skip, limit }, ctx) => {
    try {
      // users(skip: Int = 0, limit: Int = 10): [User]
      const users = await User.find({}, null, { skip, limit });
      return users;
    } catch (err) {
      ctx.logger.error(err.message);
      return new Error('Users was not find');
    }
  },
};
const Mutation = {
  createUser: async (_, { input }, ctx) => {
    try {
      const newUser = new User(input);
      await newUser.save();
      return newUser;
    } catch (err) {
      ctx.logger.error(err.message);
      return new Error('Error with create user');
    }
  },
  updateUser: async (_, { id, input }, ctx) => {
    try {
      const existUser = await User.findById(id);
      if (existUser) {
        const updUser = await User.findByIdAndUpdate(id, input, {
          new: true,
        });
        return updUser;
      }
      return new Error('User was not found');
    } catch (err) {
      ctx.logger.error(err.message);
      return new Error('Error with update user');
    }
  },
  deleteUser: async (_, { id }, ctx) => {
    try {
      const deletedUser = await User.findById(id);
      if (deletedUser) {
        await User.findByIdAndDelete(id);
        return deletedUser;
      }
      return new Error('User was removed early');
    } catch (err) {
      ctx.logger.error(err.message);
      return new Error('Error with remove user');
    }
  },
};

module.exports = {
  Query,
  Mutation,
};
