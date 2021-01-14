<template>
  <div>
    <div class="row">
      <div
        class="col-6 col-sm-4 col-lg-2 q-pa-md"
        style="padding: 10px 10px 5px 10px"
      >
        <ch-week-selector v-model="startDate"></ch-week-selector>
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
          ]"
        />
      </div>
      <div
        class="col-4 col-sm-4 col-lg-2 q-pa-md"
        style="padding: 10px 10px 5px 10px"
      >
        <q-btn
          rounded
          color="white"
          unelevated
          text-color="primary"
          icon="refresh"
          label="Refresh"
          class="font-m-bold"
          @click="refreshStats"
        />
      </div>
      <div
        class="col-8 col-sm-12 col-lg-6 q-pa-md"
        style="padding: 10px 10px 5px 10px"
      >
        <q-form ref="form" @submit.prevent>
          <ch-project-picker
            v-model="categorySelected"
            :projects="categories"
            label="Category"
            :showAvatar="true"
          ></ch-project-picker>
        </q-form>
      </div>
    </div>

    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div v-if="period == 'daily'">
        <div class="row">
          <div class="col-12 col-md-4 q-pa-md">
            <ch-chart-pie-categorical
              :data="getPieCategorical"
              :colors="getColors"
            ></ch-chart-pie-categorical>
          </div>
          <div class="col-12 col-md-8 q-pa-md">
            <ch-chart-time-categorical
              :data="getTimesCategorical"
              :dateRange="dateSpread(this.startDate)"
              xaxisType="datetime"
              :colors="getColors"
            ></ch-chart-time-categorical>
          </div>
        </div>
        <div v-if="categorySelected" class="row">
          <div class="col-12 col-md-4 q-pa-md">
            <ch-chart-pie-categorical
              :data="getProjects"
            ></ch-chart-pie-categorical>
          </div>
          <div class="col-12 col-md-8 q-pa-md">
            <ch-chart-time-categorical
              :data="getProjectsSum"
              :dateRange="dateSpread(this.startDate)"
              xaxisType="datetime"
            ></ch-chart-time-categorical>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-12 col-md-4 q-pa-md">
            <ch-chart-pie-categorical
              :data="getPieCategorical"
              :colors="getColors"
            ></ch-chart-pie-categorical>
          </div>
          <div class="col-12 col-md-8 q-pa-md">
            <ch-chart-time-categorical
              :data="getTimesCategorical"
              :dateRange="weekSpread(this.startDate)"
              xaxisType="categories"
              :colors="getColors"
            ></ch-chart-time-categorical>
          </div>
        </div>
        <div v-if="categorySelected" class="row">
          <div class="col-12 col-md-4 q-pa-md">
            <ch-chart-pie-categorical
              :data="getProjects"
            ></ch-chart-pie-categorical>
          </div>
          <div class="col-12 col-md-8 q-pa-md">
            <ch-chart-time-categorical
              :data="getProjectsSum"
              :dateRange="weekSpread(this.startDate)"
              xaxisType="categories"
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
import ChWeekSelector from '@/components/WeekSelector.vue'
import ChProjectPicker from '@/components/ProjectPicker'

import { Q_CATEGORY, Q_STATS } from '@/graphql/queries'

export default {
  name: 'Stats',
  components: {
    ChChartTimeCategorical,
    ChChartPieCategorical,
    ChWeekSelector,
    ChProjectPicker,
  },
  data() {
    return {
      startDate: '2021-01-01',
      categorySelected: null,
      period: 'daily',
      stats: [],
      isLoading: true,
    }
  },
  watch: {
    startDate() {
      this.statsRetrieve()
    },
    period() {
      this.statsRetrieve()
    },
  },
  apollo: {
    categories: {
      query: Q_CATEGORY,
    },
    stats: {
      query: Q_STATS,
      variables() {
        return {
          startDate: this.startDate,
          period: this.period,
        }
      },
      result({ data, loading }) {
        if (!loading) {
          this.stats = data.stats
          this.isLoading = false
        }
      },
    },
  },
  computed: {
    getTimesCategorical() {
      if (Object.keys(this.stats).length !== 0) {
        return this.stats.statsBarCategory
      }
      return []
    },
    getPieCategorical() {
      if (Object.keys(this.stats).length !== 0) {
        return this.stats.statsPieCategory
      }
      return {}
    },
    getProjects() {
      if (Object.keys(this.stats).length !== 0) {
        if (this.categorySelected != null) {
          return (
            this.stats.statsPieProject[this.categorySelected.description] || {
              labels: [],
              series: [],
            }
          )
        }
      }
      return {}
    },
    getProjectsSum() {
      if (Object.keys(this.stats).length !== 0) {
        if (this.categorySelected != null) {
          return this.stats.statsBarProject[this.categorySelected.description]
        }
      }
      return []
    },
    getColors() {
      if (Object.keys(this.stats).length !== 0) {
        var colorDict = {}
        this.categories.map((value) => {
          colorDict[value['description']] = value['color']
        })

        return this.stats.statsBarCategory.map((value) => {
          return colorDict[value['name']] || '#000'
        })
      }
      return []
    },
  },
  methods: {
    statsRetrieve() {
      this.$apollo.queries.stats.refresh()
    },
    refreshStats() {
      this.$apollo.queries.stats.refetch()
    },
    getWeekNumber(d) {
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
      // Set to nearest Thursday: current date + 4 - current day number
      // Make Sunday's day number 7
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
      // Get first day of year
      var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
      // Calculate full weeks to nearest Thursday
      var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
      var year = d.getUTCFullYear().toString().substr(-2)
      return [year, weekNo]
    },
    weekSpread(startDate) {
      if (startDate != null) {
        var weekFull = this.getWeekNumber(new Date(startDate))
        var year = weekFull[0]
        var weekNum = weekFull[1]
        var weekStart = Math.max(0, weekNum - 7)
        return [...Array(8).keys()]
          .map((i) => i + weekStart)
          .map((j) => `${year}W${j}`)
      } else {
        return []
      }
    },
  },
}
</script>
<style scoped>
.echarts {
  width: 100%;
  height: 400px;
}
.q-btn {
  border: 2.5px solid;
}
</style>