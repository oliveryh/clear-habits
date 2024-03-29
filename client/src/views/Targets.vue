<template>
  <div class="q-ma-md">
    <div class="row q-mb-md">
      <div class="col">
        <div class="text-h2 text-weight-light">Targets</div>
      </div>
    </div>
    <template v-for="(category, categoryId) in returnedTimeData">
      <div :key="categoryId" class="row q-my-md">
        <div class="col">
          <div class="text-headline text-left">
            <div
              :style="
                'background-color: ' +
                colorMap[categoryId].color +
                '; color: ' +
                (colorMap[categoryId].colorContrast ? 'black' : 'white')
              "
              style="
                border-radius: 5px;
                padding: 2px 5px 2px;
                margin-bottom: 4px;
                display: inline-block;
              "
              class="font-m-bold"
            >
              {{ category.description | allCapitals }}
            </div>
          </div>
        </div>
      </div>
      <div :key="categoryId + 'projects'" class="row">
        <div
          class="col-sm-4 col-lg-2 col-12"
          v-for="project in category.projects"
          :key="'project' + project.id"
        >
          <q-card class="q-ma-sm" style="border-radius: 15px">
            <q-card-section>
              <div class="text-h5 font-m-medium">
                {{ project.description | allCapitals }}
              </div>
              <div
                v-if="project.meetsMin && project.meetsMax"
                :class="['text-green-8', 'text-h6', 'font-m-bold']"
              >
                {{ secondsToTimestamp(project.committedTime) }}
              </div>
              <div
                v-else-if="!project.meetsMin && !!project.targetMinTimePerWeek"
                :class="['text-orange-5', 'text-headline', 'font-m-bold']"
              >
                {{ secondsToTimestamp(project.committedTime) }} (x{{
                  Math.floor(
                    (project.committedTime / project.targetMinTimePerWeek) *
                      100,
                  ) / 100
                }})
              </div>
              <div
                v-else-if="!project.meetsMax && !!project.targetMaxTimePerWeek"
                :class="['text-red-6', 'text-headline', 'font-m-bold']"
              >
                {{ secondsToTimestamp(project.committedTime) }} (x{{
                  Math.floor(
                    (project.committedTime / project.targetMaxTimePerWeek) *
                      100,
                  ) / 100
                }})
              </div>
              <q-chip
                v-if="project.targetMinTimePerWeek"
                icon="mdi-timer"
                :class="[
                  'q-mx-none',
                  'q-mr-sm',
                  project.meetsMin ? 'bg-green-3' : 'bg-orange-5',
                ]"
                >{{ secondsToTimestamp(project.targetMinTimePerWeek) }}</q-chip
              >
              <q-chip
                v-if="project.targetMaxTimePerWeek"
                icon="mdi-timer-off"
                :class="[
                  'q-mx-none',
                  'q-mr-sm',
                  project.meetsMax ? 'bg-green-3' : 'bg-red-5',
                ]"
                >{{ secondsToTimestamp(project.targetMaxTimePerWeek) }}</q-chip
              >
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>
    <template v-for="(category, categoryId) in returnData">
      <div :key="categoryId + 'categorydays'" class="row q-my-md">
        <div class="col">
          <div class="text-headline text-left">
            <div
              :style="
                'background-color: ' +
                colorMap[categoryId].color +
                '; color: ' +
                (colorMap[categoryId].colorContrast ? 'black' : 'white')
              "
              style="
                border-radius: 5px;
                padding: 2px 5px 2px;
                margin-bottom: 4px;
                display: inline-block;
              "
              class="font-m-bold"
            >
              {{ category.description | allCapitals }}
            </div>
          </div>
        </div>
      </div>
      <div :key="category.id" class="row">
        <div
          class="col-sm-4 col-lg-2 col-12"
          v-for="project in filterProjects(category.projects)"
          :key="project.id"
        >
          <q-card class="q-ma-sm" style="border-radius: 15px">
            <q-card-section>
              <div class="text-h5 font-m-medium">
                {{ project.description | allCapitals }}
              </div>

              <div
                :class="[
                  getColor(project.completedToday, project.daysSince),
                  'text-h6',
                  'font-m-bold',
                ]"
              >
                <div v-if="project.completedToday">Completed today 🎉</div>
                <div v-else>
                  {{
                    project.daysSince > 0 ? 'Due in ' + project.daysSince : ''
                  }}
                  {{
                    project.daysSince > 0
                      ? project.daysSince > 1
                        ? ' days'
                        : ' day'
                      : project.daysSince == 0
                      ? 'Due today'
                      : -project.daysSince + ' days overdue '
                  }}
                </div>
              </div>
              <q-chip class="q-mx-none" icon="mdi-bullseye-arrow">
                Every {{ project.targetDays }} Days</q-chip
              >
              <q-chip
                v-if="
                  project.nextScheduled != undefined &&
                  project.nextScheduled >= 0
                "
                class="q-mx-none"
                icon="mdi-calendar"
              >
                {{
                  'Scheduled ' +
                  (project.nextScheduled == 0
                    ? 'today'
                    : project.nextScheduled == 1
                    ? 'tomorrow'
                    : 'in ' + project.nextScheduled + ' days')
                }}</q-chip
              >
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import {
  Q_CATEGORY,
  Q_PROJECT,
  Q_TARGETS_LAST_ENTRY,
  Q_TARGETS_NEXT_SCHEDULED,
  Q_TARGETS_TIME,
} from '@/graphql/queries'

const daysSinceTarget = (targetDays, lastEntry) => {
  if (targetDays) {
    const today = new Date().setHours(0, 0, 0, 0)
    const lastEntryDate = new Date(lastEntry).setHours(0, 0, 0, 0)
    const timeDifference = today - lastEntryDate
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24)
    return Math.floor(targetDays - daysDifference)
  }
}

const daysUntil = (nextEntry) => {
  const today = new Date().setHours(0, 0, 0, 0)
  const nextEntryDate = new Date(nextEntry).setHours(0, 0, 0, 0)
  const timeDifference = nextEntryDate - today
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24)
  return daysDifference
}

export default {
  data() {
    return {
      returnData: [],
      colorMap: {},
      projectTargetDays: {},
      projectNextScheduled: {},
      returnedTimeData: [],
    }
  },
  methods: {
    getColor(completedToday, daysUntilDue) {
      if (completedToday) {
        return 'text-green-8'
      } else {
        if (daysUntilDue > 1) {
          return 'text-green-5'
        } else if (daysUntilDue == 1) {
          return 'text-lime-5'
        } else if (daysUntilDue == 0) {
          return 'text-orange-5'
        } else {
          return 'text-red-5'
        }
      }
    },
    getCategoryColor(categoryId) {
      const mapping = this.colorMap[categoryId]
      return (
        mapping || {
          color: '#000',
          colorContrast: 'white',
        }
      )
    },
    filterProjects(projects) {
      let filteredProjects = projects
      filteredProjects = filteredProjects.filter(
        (project) => project.targetDays != null,
      )
      return filteredProjects
    },
  },
  apollo: {
    categories: {
      query: Q_CATEGORY,
      result({ data, loading }) {
        if (!loading) {
          this.colorMap = Object.assign(
            {},
            ...data.categories.map((x) => ({
              [x.id]: { color: x.color, colorContrast: x.colorContrast },
            })),
          )
        }
      },
    },
    projects: {
      query: Q_PROJECT,
      result({ data, loading }) {
        if (!loading) {
          this.projectTargetDays = Object.assign(
            {},
            ...data.projects.map((x) => ({
              [x.id]: x.targetDays,
            })),
          )
        }
      },
    },
    targetsScheduled: {
      query: Q_TARGETS_NEXT_SCHEDULED,
      result({ data, loading }) {
        if (!loading) {
          this.projectNextScheduled = Object.assign(
            {},
            ...data.targetsScheduled.groupedAggregates.map((x) => ({
              [x.keys[0]]: daysUntil(x.minDate.entryDate),
            })),
          )
        }
      },
    },
    targetsLastEntry: {
      query: Q_TARGETS_LAST_ENTRY,
      result({ data, loading }) {
        if (!loading) {
          const listSums = data.targetsLastEntry.groupedAggregates
          const categoryBreakdown = listSums.reduce((acc, curr) => {
            if (!acc[curr.keys[0]])
              acc[curr.keys[0]] = {
                id: curr.keys[0],
                description: curr.keys[1],
                projects: [],
              }
            acc[curr.keys[0]].projects.push({
              id: curr.keys[2],
              description: curr.keys[3],
              lastEntry: curr.maxDate.entryDate,
            })
            return acc
          }, {})
          let returnData = {}
          Object.entries(categoryBreakdown).forEach(
            ([key, value]) =>
              (returnData[key] = {
                description: value.description,
                projects: value.projects
                  .sort((a, b) => (a.lastEntry > b.lastEntry ? 1 : -1))
                  .map((project) => {
                    const targetDays = this.projectTargetDays[project.id]
                    const nextScheduled = this.projectNextScheduled[project.id]
                    console.log(this.projectNextScheduled)
                    const daysUntilDue = daysSinceTarget(
                      targetDays,
                      project.lastEntry,
                    )
                    return {
                      ...project,
                      targetDays,
                      nextScheduled,
                      daysSince: daysUntilDue,
                      completedToday: daysUntilDue == targetDays,
                    }
                  })
                  .sort((a, b) =>
                    a.completedToday > b.completedToday ? 1 : -1,
                  ),
              }),
          )
          this.returnData = returnData
        }
      },
    },
    targetsTime: {
      query: Q_TARGETS_TIME,
      variables() {
        let today = new Date()
        let mondayOfToday = this.mondayOfWeek(today)
        return {
          datesIn: this.dateSpread(mondayOfToday),
        }
      },
      result({ data, loading }) {
        if (!loading) {
          const listSums = data.targetsTime.groupedAggregates
          const categoryBreakdown = listSums.reduce((acc, curr) => {
            if (!acc[curr.keys[0]])
              acc[curr.keys[0]] = {
                id: curr.keys[0],
                description: curr.keys[1],
                projects: [],
              }
            const projectId = curr.keys[2]
            const projectData = this.projects.find(
              (project) => project.id == projectId,
            )
            const sumTrackedTime = Number(curr.sum.entryTimerTrackedTime)
            const sumEstimatedTime = Number(curr.sum.entryTimerEstimatedTime)
            const committedTime =
              Math.abs(sumTrackedTime - sumEstimatedTime) +
              Math.min(sumTrackedTime, sumEstimatedTime)
            const meetsMin =
              !projectData.targetMinTimePerWeek ||
              committedTime >= projectData.targetMinTimePerWeek
            const meetsMax =
              !projectData.targetMaxTimePerWeek ||
              committedTime <= projectData.targetMaxTimePerWeek
            acc[curr.keys[0]].projects.push({
              id: curr.keys[2],
              description: curr.keys[3],
              targetMinTimePerWeek: projectData.targetMinTimePerWeek,
              targetMaxTimePerWeek: projectData.targetMaxTimePerWeek,
              sumTrackedTime,
              sumEstimatedTime,
              committedTime,
              meetsMin,
              meetsMax,
            })
            return acc
          }, {})
          this.returnedTimeData = categoryBreakdown
        }
      },
    },
  },
}
</script>
<style scoped></style>
