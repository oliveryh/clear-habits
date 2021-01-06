import graphQlResolvers from 'graphql-resolvers';
const { combineResolvers } = graphQlResolvers;
import { UserInputError } from 'apollo-server';

import { Loaders } from '../loaders';
import { Models } from '../models'
import { isAuthenticated, isTaskOwner, isForeignProjectOwner } from './authorisation';
import { TaskAttributes, TaskInstance } from '../models/task';
import { UserInstance } from '../models/user';

export default {
  Query: {
    task: combineResolvers(
      isAuthenticated,
      isTaskOwner,
      async (_parent: any, { id }: { id: number }, { me, models }: { me: UserInstance, models: Models }) => {
        return await models.Task.findByPk(id);
      },
    ),
    tasks: combineResolvers(
      isAuthenticated,
      async (_parent: any, _args: any, { me, models }: { me: UserInstance, models: Models }) => {
        const tasks = await models.Task.findAll({
          where: {
            userId: me.id,
          },
        });
        return tasks
      },
    ),
  },

  Mutation: {
    taskCreate: combineResolvers(
      isAuthenticated,
      isForeignProjectOwner,
      async (
        _parent: any,
        args: TaskAttributes,
        { me, models }: { me: UserInstance, models: Models }) => {
        args.userId = me.id
        return await models.Task.create(args as TaskAttributes)
      }
    ),

    taskDelete: combineResolvers(
      isAuthenticated,
      isTaskOwner,
      async (_parent: any, { id }: { id: number }, { models }: { models: Models}) => {
        return await models.Task.destroy({ where: { id } });
      }
    ),

    taskUpdate: combineResolvers(
      isAuthenticated,
      isTaskOwner,
      isForeignProjectOwner,
      async (_parent: any, args: TaskInstance, { me, models, loaders }: { me: UserInstance, models: Models, loaders: Loaders }) => {
        const task = await models.Task.findByPk(args.id);
        if (!task) {
          throw new UserInputError('Task cannot be found');
        }
        loaders.task.clear(task.id)
        task.set(args);
        return task.save();
      },
    ),
  },

  Task: {
    user: async (task: TaskInstance, _args: any, { loaders }: { loaders: Loaders }) => {
      return await loaders.user.load(task.userId);
    },
    project: async (task: TaskInstance, _args: any, { loaders }: { loaders: Loaders }) => {
      return await loaders.project.load(task.projectId);
    },
  },
};
