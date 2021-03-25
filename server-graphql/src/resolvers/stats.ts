import { combineResolvers } from 'graphql-resolvers';

import { Models } from '../models'
import { isAuthenticated } from './authorisation';
import { UserInstance } from '../models/user';
import { EntryInstance } from '../models/entry';
import { union } from 'lodash';

var _ = require('lodash')

interface StatsAttributes {
  startDate: string;
  period: "weekly" | "daily";
}

function dateSpread(startDate: string) {
  return Array.from(Array(7).keys()).map((num) =>
    new Date(new Date(startDate).getTime() + num * 86400000)
      .toISOString()
      .substring(0, 10),
  )
}

function getWeekNumber(d: any) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  // Get first day of year
  var yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
  // Return array of year and week number
  var year = d.getUTCFullYear().toString().substr(-2)
  return [year, weekNo]
}

export default {
  Query: {
    stats: combineResolvers(
      isAuthenticated,
      async (_parent: any, args: StatsAttributes, { me, models }: { me: UserInstance, models: Models }) => {
      const period = args.period
      const startDate = args.startDate
      if (period == 'daily') {
        var weekSpread = dateSpread(startDate)
        const entries = await models.Entry.findAll({
          include: [
            {
              model: models.Task,
              include: [
                {
                  model: models.Project,
                  include: [
                    {
                      model: models.Category,
                    }
                  ]
                },
              ],
            },
          ],
        })

        function generateBar(input: any) {
          var returnObject: any = {}

          Object.keys(input).map(function (key, index) {
            returnObject[key] = _(input[key])
              .groupBy('date')
              .mapValues((item: any) => {
                return _.sumBy(item, 'timerTrackedTime') / 3600
              })
              .value()
          })

          returnObject = _(returnObject)
            .map((value: any, prop: any) => {
              return {
                name: prop,
                data: weekSpread.map((date) => {
                  return value[date] || 0
                }),
              }
            })
            .value()
            .sort((a: any, b: any) => a['name'].localeCompare(b['name']))

          return returnObject
        }

        function generatePie(input: any) {
          var returnObject = {
            labels: [] as any,
            series: [] as any,
          }
          Object.keys(input)
            .sort()
            .map(function (key, index) {
              returnObject['labels'].push(key)
              returnObject['series'].push(
                _.sumBy(input[key], 'timerTrackedTime') / 3600,
              )
            })
          return returnObject
        }

        var weekEntries = entries.filter((entry) =>
          weekSpread.includes(entry.date || ''),
        )

        var categoryEntries = _(weekEntries)
          .groupBy('task.project.category.description')
          .value()

        const statsBarCategory = generateBar(categoryEntries)
        const statsPieCategory = generatePie(categoryEntries)

        var statsBarProject: {
          [key: string]: any
        } = {}
        var statsPieProject: {
          [key: string]: any
        } = {}

        Object.keys(categoryEntries).map(function (key, index) {
          const projectEntries = _.groupBy(
            categoryEntries[key],
            'task.project.description',
          )

          statsBarProject[key] = generateBar(projectEntries)
          statsPieProject[key] = generatePie(projectEntries)
        })

        return {
          statsBarCategory,
          statsPieCategory,
          statsBarProject,
          statsPieProject,
        }
      }
      if (period == 'weekly') {

        const entries = await models.Entry.findAll({
          include: [
            {
              model: models.Task,
              include: [
                {
                  model: models.Project,
                  include: [
                    {
                      model: models.Category,
                    }
                  ]
                },
              ],
            },
          ],
        })

        function generateBar(input: any) {
          var returnObject: any = {}

          Object.keys(input).map(function (key, index) {
            returnObject[key] = _(input[key])
              .groupBy('week')
              .mapValues((item: any) => {
                return _.sumBy(item, 'timerTrackedTime') / 3600
              })
              .value()
          })

          function weekSpread(startDate: any) {
            if (startDate != null) {
              var weekFull = getWeekNumber(new Date(startDate))
              var year = weekFull[0]
              var weekNum = weekFull[1]
              var weekStart = Math.max(0, weekNum - 7)
              return [...Array(8).keys()]
                .map((i) => i + weekStart)
                .map((j) => `${year}W${j}`)
            } else {
              return []
            }
          }

          returnObject = _(returnObject)
            .map((value: any, prop: any) => {
              return {
                name: prop,
                data: weekSpread(startDate).map((date) => {
                  return value[date] || 0
                }),
              }
            })
            .value()
            .sort((a: any, b: any) => a['name'].localeCompare(b['name']))

          return returnObject
        }

        function generatePie(input: any) {
          var returnObject = {
            labels: [] as any,
            series: [] as any,
          }
          Object.keys(input)
            .sort()
            .map(function (key, index) {
              returnObject['labels'].push(key)
              returnObject['series'].push(
                _.sumBy(input[key], 'timerTrackedTime') / 3600,
              )
            })
          return returnObject
        }

        let weekEntries = entries as any

        weekEntries.forEach((entry: any) => {
          var weekFull = getWeekNumber(new Date(entry['date'] as string))
          var year = weekFull[0]
          var weekNum = weekFull[1]
          entry['week'] = `${year}W${weekNum}`
        })

        var categoryEntries = _(weekEntries)
          .groupBy('task.project.category.description')
          .value()

        let statsBarCategory = generateBar(categoryEntries)
        let statsPieCategory = generatePie(categoryEntries)


        var statsBarProject: {
          [key: string]: any
        } = {}
        var statsPieProject: {
          [key: string]: any
        } = {}

        Object.keys(categoryEntries).map(function (key, index) {
          let projectEntries = _.groupBy(
            categoryEntries[key],
            'task.project.description',
          )

          statsBarProject[key] = generateBar(projectEntries)
          statsPieProject[key] = generatePie(projectEntries)
        })

        return {
          statsBarCategory,
          statsPieCategory,
          statsBarProject,
          statsPieProject,
        }
      }
      },
    ),
  },
};
