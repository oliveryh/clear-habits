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
      </q-card-section>
      <q-card-section class="row items-center">
        <div class="col col-12" style="min-width: 200px" v-if="taskDetails">
          <div class="row q-pb-lg">
            <div class="col col-12 col-sm-6 q-pb-md text-center">
              <div class="text-h2 text-weight-light">
                {{
                  hoursToReadable(
                    taskDetails.entriesConnection.aggregates.sum
                      .timerEstimatedTime / 3600,
                  )
                }}
              </div>
              <div class="text-headline font-m-medium">
                <q-icon name="mdi-clock-outline" />
                Estimated Time
              </div>
            </div>
            <div class="col col-12 col-sm-6 q-pb-md text-center">
              <div class="text-h2 text-weight-light">
                {{
                  hoursToReadable(
                    taskDetails.entriesConnection.aggregates.sum
                      .timerTrackedTime / 3600,
                  )
                }}
              </div>
              <div class="text-headline font-m-medium">
                <q-icon name="mdi-clock" />
                Tracked Time
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col col-12 col-md-6">
              <q-table
                title="Entries"
                flat
                dense
                :pagination="pagination"
                class="q-ma-lg q-mr-xl"
                :data="taskDetails.entries"
                :columns="entryColumns"
                row-key="id"
              >
                <template v-slot:body-cell-date="props">
                  <q-td :props="props">
                    <div>
                      <q-icon
                        v-if="props.row.date === 'backlog'"
                        size="1.5rem"
                        name="mdi-archive-outline"
                      />
                      <div v-else>
                        {{ shortYearName(props.row.date) }}
                      </div>
                    </div>
                  </q-td>
                </template>
              </q-table>
              <button-add
                objectName="Entry"
                @click="
                  () => {
                    Object.assign(newEntry, { taskId: entry.task.id })
                    modal.entryCreate = true
                  }
                "
                class="q-ml-sm"
              />
            </div>
            <div class="col col-12 col-md-6">
              <ch-chart-time-categorical
                :data="data"
                :dateRange="dateRange"
                :colors="{
                  Tracked: '#4bdd8d',
                  Estimated: '#bbb',
                }"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <ch-entry-create-modal
      :entry="newEntry"
      :show="modal.entryCreate"
      @hide="modal.entryCreate = false"
    />
  </q-dialog>
</template>

<script>
import utils from '@/common/utils'
import ButtonAdd from '@/components/ButtonAdd.vue'
import ChChartTimeCategorical from '@/components/ChartTimeCategorical.vue'
import ChEntryCreateModal from '@/components/modal/EntryCreateModal.vue'
import { Q_STATS_TIME_ENTRY, Q_TASK_DETAILS } from '@/graphql/queries'

export default {
  name: 'TaskSimilarTasksModal',
  components: {
    ButtonAdd,
    ChChartTimeCategorical,
    ChEntryCreateModal,
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
  data: () => ({
    data: [],
    dateRange: [],
    modal: {
      entryCreate: false,
    },
    newEntry: {
      description: null,
      date: 'backlog',
      timerEstimatedTime: null,
    },
    pagination: {
      sortBy: 'date',
      descending: true,
      page: 1,
      rowsPerPage: 10,
    },
    entryColumns: [
      {
        name: 'date',
        required: true,
        label: 'Date',
        align: 'left',
        field: 'date',
        sortable: true,
      },
      {
        name: 'description',
        required: true,
        label: 'Description',
        align: 'left',
        field: 'description',
        sortable: true,
      },
      {
        name: 'timerTrackedTime',
        required: true,
        label: 'Time',
        align: 'left',
        field: 'timerTrackedTime',
        sortable: true,
        format: (val, row) => {
          return `${utils.secondsToTimestamp(row.timerTrackedTime, {
            zeroPad: true,
          })} / ${utils.secondsToTimestamp(row.timerEstimatedTime, {
            zeroPad: true,
          })}`
        },
      },
    ],
  }),
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
  methods: {
    hoursToReadable: utils.hoursToReadable,
    shortYearName: utils.shortYearName,
  },
  apollo: {
    taskDetails: {
      query: Q_TASK_DETAILS,
      skip() {
        return !this.show
      },
      variables() {
        return {
          taskId: this.entry.task.id,
        }
      },
    },
    statsTimeEntry: {
      query: Q_STATS_TIME_ENTRY,
      skip() {
        return !this.taskDetails
      },
      variables() {
        return {
          groupBy: ['ENTRY_DATE', 'ENTRY_COMPLETE'],
          statFilter: {
            taskId: {
              equalTo: this.entry.task.id,
            },
            entryDate: {
              notEqualTo: 'backlog',
            },
          },
        }
      },
      result({ data, loading }) {
        if (!loading) {
          const listSums = data.statsTimeEntry.groupedAggregates
          data = listSums.reduce((acc, curr) => {
            if (!acc[curr.keys[0]]) acc[curr.keys[0]] = {}
            acc[curr.keys[0]][curr.keys[1]] = curr.sum
            return acc
          }, {})
          const formatted = Object.keys(data).reduce((acc, date) => {
            const completeTracked = Number(
              data[date][true]?.entryTimerTrackedTime || 0,
            )
            const incompleteEstimated = Number(
              data[date][false]?.entryTimerEstimatedTime || 0,
            )
            const incompleteTracked = Number(
              data[date][false]?.entryTimerTrackedTime || 0,
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
          const keyed = formatted.reduce((acc, curr) => {
            if (!acc[curr.date]) acc[curr.date] = {}
            acc[curr.date][curr.group] = curr.value
            return acc
          }, {})

          const allDates = listSums.map((s) => s.keys[0]).sort()
          const dateMin = allDates[0]
          const dateMax = allDates[allDates.length - 1]
          const datesDomain = this.dateSpread(dateMin, dateMax)
          const chartData = ['Tracked', 'Estimated'].reduce((acc, group) => {
            return acc.concat({
              name: group,
              data: datesDomain.map((date) => keyed[date]?.[group] || 0),
            })
          }, [])
          this.dateRange = datesDomain
          this.data = chartData
        } else {
          this.dateRange = []
          this.data = []
        }
      },
    },
  },
}
</script>

<style></style>
