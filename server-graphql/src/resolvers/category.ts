import graphQlResolvers from 'graphql-resolvers';
const { combineResolvers } = graphQlResolvers;
import { UserInputError } from 'apollo-server';

import { Loaders } from '../loaders';

import { isAuthenticated, isCategoryOwner } from './authorisation';
import { CategoryAttributes, CategoryInstance } from '../models/category';
import { UserInstance } from '../models/user';
import { Models } from '../models';

export default {
  Query: {
    category: combineResolvers(
      isAuthenticated,
      isCategoryOwner,
      async (_parent: any, args: any, { me, models }: { me: UserInstance, models: Models }) => {
        const category = await models.Category.findByPk(args.id);
        if (!category) {
          throw new UserInputError('Category cannot be found');
        }
        return category;
      },
    ),
    categories: combineResolvers(
      isAuthenticated,
      async (_parent: any, _args: any, { me, models }: { me: UserInstance, models: Models }) => {
        const categories = await models.Category.findAll({
          where: {
            userId: me.id,
          },
        });
        return categories
      }
    ),
  },

  Mutation: {
    categoryCreate: combineResolvers(
      isAuthenticated,
      async (
        _parent: any,
        args: CategoryAttributes,
        { me, models }: { me: UserInstance, models: Models }) => {
          args.userId = me.id
        const category = await models.Category.create(args as CategoryAttributes)
        return category;
      }
    ),

    categoryDelete: combineResolvers(
      isAuthenticated,
      isCategoryOwner,
      async (_parent: any, args: CategoryAttributes, { me, models }: { me: UserInstance, models: Models }) => {
        const category = await models.Category.destroy({ where: { id: args.id as number } });
        if (!category) {
          throw new UserInputError('Category cannot be found');
        }
        return category;
      }
    ),

    categoryUpdate: combineResolvers(
      isAuthenticated,
      isCategoryOwner,
      async (_parent: any, args: any, { me, models, loaders }: { me: UserInstance, models: Models, loaders: Loaders }) => {
        const category = await models.Category.findByPk(args.id);
        if (!category) {
          throw new UserInputError('Category cannot be found');
        }
        loaders.category.clear(category.id)
        category.set(args);
        return category.save();
      }
    ),
  },

  Category: {
    user: async (category: CategoryInstance, _args: any, { loaders }: { loaders: Loaders }) => {
      return await loaders.user.load(category.userId);
    },
  },
};
