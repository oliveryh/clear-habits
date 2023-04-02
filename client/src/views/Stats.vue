<template>
  <div>
    <div class="row">
      <div
        class="col-6 col-sm-4 col-lg-2 q-pa-md"
        style="padding: 10px 10px 5px 10px"
      >
        <ch-date-selector
          v-model="settings.startDate"
          period="week"
        ></ch-date-selector>
      </div>
      <div
        class="col-6 col-sm-4 col-lg-2 q-pa-md"
        style="padding: 10px 10px 5px 10px"
      >
        <q-btn-toggle
          rounded
          spread
          v-model="period"
          toggle-color="primary"
          color="white"
          unelevated
          text-color="primary"
          class="font-m-bold"
          style="border: 2px solid #027be3"
          :options="[
            { label: 'Daily', value: 'daily' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' },
          ]"
        />
      </div>
      <div
        class="col-12 col-md-4 col-lg-2 q-pa-md"
        style="padding: 10px 10px 5px 10px"
      >
        <q-btn-group
          rounded
          color="white"
          unelevated
          text-color="primary"
          class="font-m-bold"
        >
          <q-btn
            text-color="primary"
            icon="refresh"
            label="Refresh"
            class="font-m-bold"
            @click="refreshStats"
          />
          <q-btn-dropdown
            v-if="period == 'weekly'"
            rounded
            spread
            color="white"
            unelevated
            text-color="primary"
            class="font-m-bold"
            style="border: 2px solid #027be3"
            :label="numWeeks + ' weeks'"
          >
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="numWeeks = weekNumber"
                v-for="weekNumber in [5, 10, 20]"
                :key="weekNumber"
              >
                <q-item-section>
                  <q-item-label>{{ weekNumber }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-btn-group>
      </div>

      <div class="col-6 col-md-3" style="padding: 10px 10px 5px 10px">
        <q-form ref="form" @submit.prevent>
          <ch-project-picker
            v-model="categorySelected"
            :projects="categories"
            label="Category"
            :showAvatar="true"
          ></ch-project-picker>
        </q-form>
      </div>
      <div class="col-6 col-md-3" style="padding: 10px 10px 5px 10px">
        <q-form ref="form" @submit.prevent>
          <ch-project-picker
            v-model="settings.projectSelected"
            :projects="filteredProjects"
            label="Project"
            :showAvatar="false"
          ></ch-project-picker>
        </q-form>
      </div>
    </div>

    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div>
        <div class="row">
          <div class="col-12 col-md-4 q-pa-md">
            <div class="text-h4 text-weight-light">Overall</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-4 q-pa-md">
            <ch-chart-pie-categorical
              :data="statsPieCategory"
              :colors="getColors"
            ></ch-chart-pie-categorical>
          </div>
          <div class="col-12 col-md-8 q-pa-md">
            <ch-chart-time-categorical
              :data="statsTimeCategory"
              :dateRange="getSpread()"
              :xaxisType="period == 'daily' ? 'datetime' : 'categories'"
              :colors="getColorDict"
            ></ch-chart-time-categorical>
          </div>
        </div>
        <div v-if="categorySelected" class="row">
          <div class="col-12 col-md-4 q-pa-md">
            <div class="text-h4 text-weight-light">{{ categorySelected.description }}</div>
          </div>
        </div>
        <div v-if="categorySelected" class="row">
          <div class="col-12 col-md-4 q-pa-md">
            <ch-chart-pie-categorical
              :data="statsPieProject"
            ></ch-chart-pie-categorical>
          </div>
          <div class="col-12 col-md-8 q-pa-md">
            <ch-chart-time-categorical
              :data="statsTimeProject"
              :dateRange="getSpread()"
              :xaxisType="period == 'daily' ? 'datetime' : 'categories'"
            ></ch-chart-time-categorical>
          </div>
        </div>
        <div v-if="settings.projectSelected" class="row">
          <div class="col-12 col-md-4 q-pa-md">
            <div class="text-h4 text-weight-light">{{ settings.projectSelected.description }}</div>
          </div>
        </div>
        <div v-if="settings.projectSelected" class="row">
          <div class="col-12 col-md-4 q-pa-md">
            <ch-chart-pie-categorical
              :data="statsPieTask"
            ></ch-chart-pie-categorical>
          </div>
          <div class="col-12 col-md-8 q-pa-md">
            <ch-chart-time-categorical
              :data="statsTimeTask"
              :dateRange="getSpread()"
              :xaxisType="period == 'daily' ? 'datetime' : 'categories'"
            ></ch-chart-time-categorical>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChChartTimeCategorical from '@/components/ChartTimeCategorical.vue'
import ChChartPieCategorical from '@/components/ChartPieCategorical.vue'
import ChDateSelector from '@/components/DateSelector.vue'
import ChProjectPicker from '@/components/ProjectPicker'

import {
  Q_CATEGORY,
  Q_PROJECT,
  Q_SETTINGS,
  Q_STATS_PIE_CATEGORY,
  Q_STATS_TIME_CATEGORY,
  Q_STATS_PIE_PROJECT,
  Q_STATS_TIME_PROJECT,
  Q_STATS_PIE_TASK,
  Q_STATS_TIME_TASK,
} from '@/graphql/queries'

import utils from '@/common/utils'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const queryMapping = {
  'time,category': Q_STATS_TIME_CATEGORY,
  'time,project': Q_STATS_TIME_PROJECT,
  'time,task': Q_STATS_TIME_TASK,
  'pie,category': Q_STATS_PIE_CATEGORY,
  'pie,project': Q_STATS_PIE_PROJECT,
  'pie,task': Q_STATS_PIE_TASK,
}

let generateQuery = (graphType, level) => {
  return {
    skip() {
      if (level == 'project') {
        return !this.categorySelected
      }
      if (level == 'task') {
        return !this.settings.projectSelected
      } else {
        return false
      }
    },
    variables() {
      var statFilter = {}
      if (level == 'project') {
        statFilter['categoryId'] = {
          equalTo: this.categorySelected.id,
        }
      } else if (level == 'task') {
        statFilter['projectId'] = {
          equalTo: this.settings.projectSelected.id,
        }
      }
      var groupBy = []
      if (this.period == 'daily') {
        if (graphType == 'time') {
          groupBy.push('ENTRY_DATE')
        }
        statFilter['entryDate'] = {
          in: this.dateSpread(this.settings.startDate),
        }
      } else if (this.period == 'weekly') {
        if (graphType == 'time') {
          groupBy.push('ENTRY_WEEK_NUMBER')
        }
        statFilter['entryWeekNumber'] = {
          in: this.weekSpread(this.settings.startDate, this.numWeeks),
        }
      } else if (this.period == 'monthly') {
        if (graphType == 'time') {
          groupBy.push('ENTRY_DATE_MONTH')
        }
        statFilter['entryDate'] = {
          greaterThanOrEqualTo: '2021-01-01',
          lessThan: '2023-01-01',
        }
      }
      groupBy.push(`${level.toUpperCase()}_DESCRIPTION`)
      if (level != 'task') {
        groupBy.push(`${level.toUpperCase()}_ID`)
      }
      return {
        statFilter,
        groupBy,
      }
    },
    query: queryMapping[[graphType, level]],
  }
}

let generatePie = (level) => {
  const generatedQuery = generateQuery('pie', level)
  return {
    ...generatedQuery,
    result({ data, loading }) {
      if (!loading) {
        const listSums = data[
          `statsPie${capitalizeFirstLetter(level)}`
        ].groupedAggregates.sort((a, b) => (a.keys[0] > b.keys[0] ? 1 : -1))
        const series = listSums.map((sum) => {
          return sum.sum.entryTimerTrackedTime / 3600
        })
        const labels = listSums.map((sum) => {
          return sum.keys[0]
        })
        this[`statsPie${capitalizeFirstLetter(level)}`] = {
          labels,
          series,
        }
      }
    },
  }
}

let generateBar = (level) => {
  const generatedQuery = generateQuery('time', level)
  return {
    ...generatedQuery,
    result({ data, loading }) {
      if (!loading) {
        const listSums =
          data[`statsTime${capitalizeFirstLetter(level)}`].groupedAggregates
        const barChartData = listSums.reduce((acc, curr) => {
          if (!acc[curr.keys[1]]) acc[curr.keys[1]] = {}
          acc[curr.keys[1]][curr.keys[0]] = curr.sum.entryTimerTrackedTime
          return acc
        }, {})
        const dates = this.getSpread()
        this[`statsTime${capitalizeFirstLetter(level)}`] = Object.keys(
          barChartData,
        )
          .map((key) => {
            return {
              name: key,
              data: dates.map(
                (date) => Number(barChartData[key][date]) / 3600 || 0,
              ),
            }
          })
          .sort((a, b) => (a.name > b.name ? 1 : -1))
        this.isLoading = false
      }
    },
  }
}

export default {
  name: 'Stats',
  components: {
    ChChartTimeCategorical,
    ChChartPieCategorical,
    ChDateSelector,
    ChProjectPicker,
  },
  data() {
    return {
      categorySelected: null,
      period: 'daily',
      statsPieCategory: {},
      statsTimeCategory: [],
      statsPieProject: {},
      statsTimeProject: [],
      isLoading: true,
      numWeeks: 5,
    }
  },
  watch: {
    startDate() {
      this.statsRetrieve()
    },
    period() {
      this.statsRetrieve()
    },
    categorySelected() {
      this.$apollo.queries.statsPieProject.refresh()
      this.$apollo.queries.statsTimeProject.refresh()
    },
    numWeeks() {
      this.statsRetrieve()
    },
    watch: {
      settings: {
        deep: true,
        handler(settings) {
          this.settingsUpdate(settings)
        },
      },
    },
  },
  apollo: {
    categories: {
      query: Q_CATEGORY,
    },
    projects: {
      query: Q_PROJECT,
    },
    settings: {
      query: Q_SETTINGS,
    },
    statsPieCategory: generatePie('category'),
    statsPieProject: generatePie('project'),
    statsPieTask: generatePie('task'),
    statsTimeCategory: generateBar('category'),
    statsTimeProject: generateBar('project'),
    statsTimeTask: generateBar('task'),
  },
  computed: {
    getColors() {
      if (Object.keys(this.statsPieCategory).length !== 0) {
        var colorDict = {}
        this.categories.map((value) => {
          colorDict[value['description']] = value['color']
        })
        return this.statsPieCategory.labels.map((value) => {
          return colorDict[value] || '#000'
        })
      }
      return []
    },
    getColorDict() {
      var colorDict = {}
      this.categories.map((value) => {
        colorDict[value['description']] = value['color']
      })
      return colorDict
    },
    filteredProjects() {
      var projects_filtered = this.projects
      if (this.categorySelected) {
        projects_filtered = projects_filtered.filter(
          (project) => project.category.id == this.categorySelected.id,
        )
      }
      return projects_filtered
    },
  },
  methods: {
    statsRetrieve() {
      this.$apollo.queries.statsPieCategory.refresh()
      this.$apollo.queries.statsPieProject.refresh()
      this.$apollo.queries.statsPieTask.refresh()
      this.$apollo.queries.statsTimeCategory.refresh()
      this.$apollo.queries.statsTimeProject.refresh()
      this.$apollo.queries.statsTimeTask.refresh()
    },
    refreshStats() {
      this.$apollo.queries.statsPieCategory.refetch()
    },
    weekSpread: utils.weekSpread,
    monthSpread: utils.monthSpread,
    getSpread() {
      if (this.period == 'daily') {
        return this.dateSpread(this.settings.startDate)
      } else if (this.period == 'weekly') {
        return this.weekSpread(this.settings.startDate, this.numWeeks)
      } else if (this.period == 'monthly') {
        return this.monthSpread(this.settings.startDate, 12)
      }
    },
  },
}
</script>
<style scoped>
.q-btn {
  border: 2.5px solid;
}
</style>