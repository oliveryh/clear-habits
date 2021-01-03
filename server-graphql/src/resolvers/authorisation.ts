import { ForbiddenError, AuthenticationError, UserInputError } from 'apollo-server-express';
import graphQlResolvers from 'graphql-resolvers';
import { Models } from '../models';
import { UserInstance } from '../models/user';
const { skip } = graphQlResolvers;

export const isAuthenticated = (_parent: any, _args: any, { me, models }: { me: UserInstance, models: Models }) => {
  if (!me) {
    throw new AuthenticationError('Not authenticated as user');
  }

  return skip;
};

export const isOwner = (modelType: string, reference: string) => async (
  _parent: any,
  args: any,
  { me, models }: { me: UserInstance, models: Models }) => {
  if (reference in args) {
    const item = await models[modelType].findByPk(args[reference], { raw: true });

    if (!item) {
      return new UserInputError(modelType + ' cannot be found');
    }

    if (item.userId !== me.id) {
      throw new ForbiddenError('Not authorised to take this action');
    }
  }

  return skip;
};

// Check if ID of model is owned by user
export const isCategoryOwner = isOwner('Category', 'id')
export const isProjectOwner = isOwner('Project', 'id')
export const isTaskOwner = isOwner('Task', 'id')
export const isEntryOwner = isOwner('Entry', 'id')

// Check if model as foreign key is ownder by user
export const isForeignCategoryOwner = isOwner('Category', 'categoryId')
export const isForeignProjectOwner = isOwner('Project', 'projectId')
export const isForeignTaskOwner = isOwner('Task', 'taskId')

