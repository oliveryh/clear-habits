import graphQlResolvers from 'graphql-resolvers';
const { combineResolvers } = graphQlResolvers;
import { UserInputError } from 'apollo-server';

import { Loaders } from '../loaders';
import { Models } from '../models';
import { isAuthenticated, isProjectOwner, isForeignCategoryOwner } from './authorisation';
import { ProjectAttributes, ProjectInstance } from '../models/project';
import { UserInstance } from '../models/user';

export default {
  Query: {
    project: combineResolvers(
      isAuthenticated,
      isProjectOwner,
      async (_parent: any, { id }: { id: number }, { me, models }: { me: UserInstance, models: Models }) => {
        return await models.Project.findByPk(id);
      },
    ),
    projects: combineResolvers(
      isAuthenticated,
      async (_parent: any, _args: any, { me, models }: { me: UserInstance, models: Models }) => {
        const projects = await models.Project.findAll({
          where: {
            userId: me.id,
          },
        });
        return projects
      }
    ),
  },

  Mutation: {
    projectCreate: combineResolvers(
      isAuthenticated,
      isForeignCategoryOwner,
      async (
        _parent: any,
        args: ProjectAttributes,
        { me, models }: { me: UserInstance, models: Models }) => {
        args.userId = me.id
        return await models.Project.create(args as ProjectAttributes)
      }
    ),

    projectDelete: combineResolvers(
      isAuthenticated,
      isProjectOwner,
      async (_parent: any, { id }, { models }) => {
        return await models.Project.destroy({ where: { id } });
      }
    ),

    projectUpdate: combineResolvers(
      isAuthenticated,
      isProjectOwner,
      isForeignCategoryOwner,
      async (_parent: any, args, { me, models, loaders }: { me: UserInstance, models: Models, loaders: Loaders }) => {
        const project = await models.Project.findByPk(args.id);
        if (!project) {
          throw new UserInputError('Project cannot be found');
        }
        loaders.project.clear(project.id)
        project.set(args);
        return project.save();
      }
    ),
  },

  Project: {
    user: async (project: ProjectInstance, _args: any, { loaders }: { loaders: Loaders }) => {
      return await loaders.user.load(project.userId);
    },
    category: async (project: ProjectInstance, _args: any, { loaders }: { loaders: Loaders }) => {
      return await loaders.category.load(project.categoryId);
    },
    tasks: async (project: ProjectInstance, _args: any, { loaders, models }: { loaders: Loaders, models: Models }) => {
      const projects = await models.Task.findAll({ where: { projectId: project.id }})
      return projects
    },
  },
};
