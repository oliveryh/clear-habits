import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { UserInstance } from '../models/user'
import { Models } from '../models'

const createToken = async (user: UserInstance, secret: string, expiresIn: string) => {
  const { id, email, username } = user;
  return jwt.sign({ id, email, username }, secret, { expiresIn });
};

export default {
  Query: {
    me: async (_parent: any, _args: any, { models, me }: { me: UserInstance,  models: Models }) => {
      return await models.User.findByPk(me.id);
    },
    user: async (_parent: any, { id }: any, { models }: { models: Models }) => {
      return await models.User.findByPk(id);
    },
    users: async (_parent: any, _args: any, { models }: { models: Models }) => {
      return await models.User.findAll();
    },
  },

  Mutation: {
    signUp: async (
      _parent: any,
      { username, email, password }: any,
      { models, secret }: any
    ) => {
      const user = await models.User.create({
        username,
        email,
        password,
      });

      return { token: createToken(user, secret, '7d') };
    },
    signIn: async (
        _parent: any,
        { login, password }: { login: string, password: string },
        { models, secret }: { models: Models, secret: string }) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError('No user found with these login credentials');
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password');
      }

      return { token: createToken(user, secret, '7d') };
    },
  },

  User: {
    projects: async (user: UserInstance, _args: any, { models }: { models: Models }) => {
      return await models.Project.findAll({
        where: {
          userId: user.id,
        },
      });
    },
    tasks: async (user: UserInstance, _args: any, { models }: { models: Models}) => {
      return await models.Task.findAll({
        where: {
          userId: user.id,
        },
      });
    },
  },
};
