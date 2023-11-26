<template>
  <q-dialog v-model="showModal" v-close-popup>
    <q-card style="width: 1000px; max-width: 1500px">
      <q-card-section class="row items-center">
        <div
          :style="
            'background-color: ' +
            entry.task.project.category.color +
            '; color: ' +
            (entry.task.project.category.colorContrast ? 'black' : 'white')
          "
          style="
            border-radius: 5px;
            padding: 2px 5px 2px;
            margin-bottom: 4px;
            display: inline-block;
          "
          class="font-m-bold"
        >
          {{ entry.task.project.description | allCapitals }}
        </div>
        <span class="q-px-sm"><strong>/</strong></span>
        <div class="text-subtitle-2 text-weight-medium text-left font-m-medium">
          {{ entry.task.description }}
        </div>
        <q-btn-toggle
          spread
          rounded
          bold
          v-model="period"
          toggle-color="primary"
          color="white"
          unelevated
          text-color="primary"
          class="font-m-bold"
          style="border: 2px solid primary; margin-left: auto"
          :options="[
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' },
          ]"
        />
      </q-card-section>
      <q-card-section class="row items-center">
        <div class="col col-12" style="min-width: 200px">
          <div class="row">
            <div class="col col-12" style="height: 400px">
              <ch-chart-time-categorical
                :data="data"
                :dateRange="dateRange"
                :showMovingAverage="true"
                :xaxisType="period === 'weekly' ? 'week' : 'month'"
                :colors="{
                  Tracked: '#4bdd8d',
                  Estimated: '#bbb',
                }"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-caption text-weight-medium" style="color: grey">
          <q-icon name="mdi-clock-outline" />
          Recurs approximately every {{ recursEvery }} days
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import utils from '@/common/utils'
import ChChartTimeCategorical from '@/components/ChartTimeCategorical.vue'
import { Q_STATS_TIME_SIMILAR_TASK } from '@/graphql/queries'

export default {
  name: 'TaskSimilarTasksModal',
  components: {
    ChChartTimeCategorical,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    entry: {
      type: Object,
      default: null,
    },
  },
  computed: {
    showModal: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit('hide', value)
      },
    },
  },
  data: () => ({
    data: [],
    dateRange: [],
    reccursEvery: 0,
    period: 'monthly',
  }),
  methods: {
    weekSpreadSequential: utils.weekSpreadSequential,
  },
  apollo: {
    statsTimeSimilarTask: {
      query: Q_STATS_TIME_SIMILAR_TASK,
      skip() {
        return !this.show
      },
      variables() {
        const periodGrouping =
          this.period === 'weekly' ? 'ENTRY_WEEK_NUMBER' : 'ENTRY_DATE_MONTH'
        return {
          groupBy: [periodGrouping, 'ENTRY_COMPLETE'],
          statFilter: {
            entryDate: {
              notEqualTo: 'backlog',
            },
            projectId: {
              equalTo: this.entry.task.project.id,
            },
            taskDescription: {
              equalTo: this.entry.task.description,
            },
          },
        }
      },
      result({ data, loading }) {
        if (!loading) {
          const listSums = data.statsTimeSimilarTask.groupedAggregates
          const barChartData = listSums.reduce((acc, curr) => {
            if (!acc[curr.keys[0]]) acc[curr.keys[0]] = {}
            acc[curr.keys[0]][curr.keys[1]] = curr.sum
            return acc
          }, {})
          const formatted = Object.keys(barChartData).reduce((acc, date) => {
            const completeTracked = Number(
              barChartData[date][true]?.entryTimerTrackedTime || 0,
            )
            const incompleteEstimated = Number(
              barChartData[date][false]?.entryTimerEstimatedTime || 0,
            )
            const incompleteTracked = Number(
              barChartData[date][false]?.entryTimerTrackedTime || 0,
            )
            const estimatedTime =
              Math.max(0, incompleteEstimated - incompleteTracked) / 3600
            const trackedTime =
              Math.max(0, incompleteTracked + completeTracked) / 3600
            return acc.concat([
              {
                group: 'Estimated',
                date: date,
                value: estimatedTime,
              },
              {
                group: 'Tracked',
                date: date,
                value: trackedTime,
              },
            ])
          }, [])
          const allDates = listSums.map((s) => s.keys[0]).sort()
          const dateMin = allDates[0]
          const dateMax = allDates[allDates.length - 1]
          let dateRange
          if (this.period === 'weekly') {
            dateRange = this.weekSpreadSequential(dateMin, dateMax)
          } else {
            dateRange = utils.monthSpreadSequential(dateMin, dateMax)
          }
          const keyed = formatted.reduce((acc, curr) => {
            if (!acc[curr.date]) acc[curr.date] = {}
            acc[curr.date][curr.group] = curr.value
            return acc
          }, {})
          const chartData = ['Tracked', 'Estimated'].reduce((acc, group) => {
            return acc.concat({
              name: group,
              data: dateRange.map((date) => keyed[date]?.[group] || 0),
            })
          }, [])
          this.dateRange = dateRange
          this.data = chartData

          const minDate = data.statsCountTasks.aggregates.minDate.entryDate
          const maxDate = data.statsCountTasks.aggregates.maxDate.entryDate
          const days = utils.daysBetween(minDate, maxDate)
          const distinctCount =
            data.statsCountTasks.aggregates.distinctCount.taskId
          this.recursEvery = Math.round(days / distinctCount)
        } else {
          this.dateRange = []
          this.data = []
        }
      },
    },
  },
}
</script>
