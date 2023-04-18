const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select("-__v -password")
                    .populate("savedBooks");

                return userData;
            }
            throw new AuthenticationError("You are not logged in");
        },
    },
    Mutation: {
        // input the args email and password to the user log in
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("username/password is incorrect");
            }
            // retrieve and check user password behind the curtain
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("username/password is incorrect");
            }
            // all pass assign token to user.
            const token = signToken(user);
            return { token, user };
        },
        // input the args username, email and password to add a new user 
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        // input arg, newbook to pull from parameter 
        saveBook: async (parent, { newBook }, context) => {

            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: newBook } },
                    { new: true }
                );

                return updatedUser;
            }
            throw new AuthenticationError("You must be logged in!");
        },
        // bookid arg will delete the bookid and all context 
        removeBook: async (parent, { bookId }, context) => {

            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );

                return updatedUser;
            }
            throw new AuthenticationError("You must be logged in!");
        },
    },
};

module.exports = resolvers;
