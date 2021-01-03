import graphQlResolvers from 'graphql-resolvers';
const { combineResolvers } = graphQlResolvers;
import { UserInputError } from 'apollo-server';

import { Loaders } from '../loaders';
import { Models } from '../models'
import { isAuthenticated, isEntryOwner, isForeignProjectOwner, isForeignTaskOwner } from './authorisation';
import { EntryAttributes, EntryInstance } from '../models/entry';
import { TaskAttributes } from '../models/task';
import { UserInstance } from '../models/user';

export default {
  Query: {
    entry: combineResolvers(
      isAuthenticated,
      isEntryOwner,
      async (_parent: any, { id }: { id: number }, { me, models }: { me: UserInstance, models: Models }) => {
        return await models.Entry.findByPk(id);
      },
    ),
    entries: combineResolvers(
      isAuthenticated,
      async (_parent: any, _args: any, { me, models }: { me: UserInstance, models: Models }) => {
        const entries = await models.Entry.findAll({
          where: {
            userId: me.id,
          },
        });
        return entries
      },
    ),
  },

  Mutation: {
    entryCreate: combineResolvers(
      isAuthenticated,
      isForeignTaskOwner,
      async (
        _parent: any,
        args: EntryAttributes,
        { me, models }: { me: UserInstance, models: Models }) => {
        args.userId = me.id
        return await models.Entry.create(args as EntryAttributes)
      }
    ),

    entryCreateWithTask: combineResolvers(
      isAuthenticated,
      isForeignProjectOwner,
      async (
        _parent: any,
        args: EntryAttributes & TaskAttributes,
        { me, models }: { me: UserInstance, models: Models }) => {
        args.userId = me.id
        const newTask = {
          userId: me.id,
          projectId: args.projectId,
          description: args.description,
        }
        const task = await models.Task.create(newTask as TaskAttributes)
        const taskId = task.id
        const newEntry = {
          userId: me.id,
          taskId,
          date: args.date,
          timerEstimatedTime: args.timerEstimatedTime,
        }
        return await models.Entry.create(newEntry as EntryAttributes)
      }
    ),

    entryDelete: combineResolvers(
      isAuthenticated,
      isEntryOwner,
      async (_parent: any, { id }: { id: number }, { models }: { models: Models}) => {
        return await models.Entry.destroy({ where: { id } });
      }
    ),

    entryUpdate: combineResolvers(
      isAuthenticated,
      isEntryOwner,
      isForeignTaskOwner,
      async (_parent: any, args: EntryInstance, { models }: { me: UserInstance, models: Models }) => {
        const entry = await models.Entry.findByPk(args.id);
        if (!entry) {
          throw new UserInputError('Entry cannot be found');
        }
        entry.set(args);
        return entry.save();
      },
    ),

    entryStart: combineResolvers(
      isAuthenticated,
      isEntryOwner,
      async (_parent: any, args: EntryInstance, { models }: { me: UserInstance, models: Models }) => {
        const entry = await models.Entry.findByPk(args.id);
        if (!entry) {
          throw new UserInputError('Entry cannot be found');
        }
        if (!entry.timerActive) {
          entry.timerActive = true
          entry.timerStartedAt = new Date()
        }
        return entry.save()
      } 
    ),

    entryStop: combineResolvers(
      isAuthenticated,
      isEntryOwner,
      async (_parent: any, args: EntryInstance, { models }: { me: UserInstance, models: Models }) => {
        const entry = await models.Entry.findByPk(args.id);
        if (!entry) {
          throw new UserInputError('Entry cannot be found');
        }
        // stop the timer if it was running
        if (entry.timerActive && (entry.timerStartedAt != null)) {
          const numSeconds = Math.floor((Date.now() - entry.timerStartedAt.getTime()) / 1000)
          entry.timerActive = false
          entry.timerTrackedTime = (entry.timerTrackedTime || 0) + numSeconds
          entry.timerStartedAt = null
        }
        return entry.save()
      }
    ),

    entryComplete: combineResolvers(
      isAuthenticated,
      isEntryOwner,
      async (_parent: any, args: EntryInstance, { models }: { me: UserInstance, models: Models }) => {
        const entry = await models.Entry.findByPk(args.id);
        if (!entry) {
          throw new UserInputError('Entry cannot be found');
        }

        // stop the timer if it was running
        if (entry.timerActive && (entry.timerStartedAt != null)) {
          const numSeconds = Math.floor((Date.now() - entry.timerStartedAt.getTime()) / 1000)
          entry.timerActive = false
          entry.timerTrackedTime = (entry.timerTrackedTime || 0) + numSeconds
          entry.timerStartedAt = null
        }

        // set the tracked time to estimated
        if ((entry.timerTrackedTime === 0) || ((entry.timerTrackedTime == undefined) && (entry.timerEstimatedTime != 0))) {
          entry.timerTrackedTime = entry.timerEstimatedTime
        }

        // complete task
        entry.complete = true
      
        return entry.save()
      }
    ),

    entryReorder: combineResolvers(
      isAuthenticated,
      isEntryOwner,
      async (_parent: any, args: EntryInstance, { models }: { me: UserInstance, models: Models }) => {

        var retEntries: Array<EntryAttributes> = []
        const entries = args.entries || []
        const newDate = args.date

        return Promise.all(entries.map(async (newEntry) => {
          const entry = await models.Entry.findByPk(newEntry.id);
          if (!entry) {
            throw new UserInputError('Entry cannot be found');
          }
          entry.set({
            order: newEntry.order,
            date: newDate,
          })
          return entry.save()
        }));
      }
    ) 
  },

  Entry: {
    user: async (entry: EntryInstance, _args: any, { loaders }: { loaders: Loaders }) => {
      return await loaders.user.load(entry.userId);
    },
    task: async (entry: EntryInstance, _args: any, { loaders }: { loaders: Loaders }) => {
      return await loaders.task.load(entry.taskId);
    },
  },
};
