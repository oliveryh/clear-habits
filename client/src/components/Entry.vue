<template>
  <div>
    <q-card style="border-radius: 15px">
      <q-card-section style="padding: 10px; padding-bottom: 0px">
        <div v-if="entry.task.project" class="text-headline text-left">
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
        </div>
        <div v-else class="text-headline text-left">NONE</div>
        <div class="text-subtitle-2 text-weight-medium text-left font-m-medium">
          {{ entry.task.description }}
          <q-btn
            class="q-px-none"
            flat
            size="sm"
            color="grey"
            round
            dense
            @click="showTaskDetails()"
            icon="mdi-chart-bar"
          ></q-btn>
          <q-btn
            class="q-px-none"
            flat
            size="sm"
            color="grey"
            round
            dense
            @click="showSimilarTasks()"
            icon="mdi-calendar-multiple-check"
          ></q-btn>
        </div>
        <div
          v-if="entry.description"
          class="text-subtitle-2 text-weight-medium text-left font-m-light"
        >
          {{ entry.description }}
        </div>
      </q-card-section>
      <q-card-actions align="left" style="margin: 2px; padding-top: 4px">
        <q-btn
          color="red-12"
          push
          dense
          :size="isMobile() ? '11px' : 'md'"
          class="font-m-medium"
          style="border-radius: 10px; border: 4px; margin-top: 0"
          v-if="entry.timerActive"
          @click="stopEntry(entry)"
          icon="mdi-stop"
        >
          <div v-html="timerLabel"></div
        ></q-btn>
        <q-btn
          :color="timerTrackedTime > 0 ? 'orange' : 'green-14'"
          outline
          dense
          :size="isMobile() ? '11px' : 'md'"
          class="font-m-medium"
          style="background: #ff0080; border-radius: 10px; border: 4px"
          v-else
          @click="startEntry(entry)"
          icon="mdi-play"
        >
          <div v-html="timerLabel"></div
        ></q-btn>
        <q-space />
        <q-btn-group flat>
          <q-btn
            v-if="entry.complete"
            flat
            color="orange"
            dense
            round
            @click="
              entry.complete = false
              restartEntry(entry)
            "
            icon="mdi-undo-variant"
          ></q-btn>
          <q-btn
            v-else
            flat
            color="green"
            dense
            :size="isMobile() ? '11px' : 'md'"
            round
            @click="completeEntry(entry.id)"
            icon="mdi-check"
          ></q-btn>
          <q-btn
            class="q-px-none"
            flat
            color="grey"
            round
            :size="isMobile() ? '11px' : 'md'"
            dense
            @click="editorOpen()"
            icon="mdi-pencil"
          ></q-btn>
        </q-btn-group>
        <q-linear-progress
          style="margin: 5px 0px 0px"
          size="7px"
          :value="progress"
          rounded
          :color="
            entry.timerEstimatedTime < timerTrackedTime ? 'red' : 'primary'
          "
          track-color="grey"
        />
      </q-card-actions>
    </q-card>
    <q-dialog v-if="editedEntry != null" v-model="editorDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit Task</div>
          <q-form ref="taskForm" class="q-gutter-md" @submit.prevent>
            <ch-project-picker
              v-model="editedEntry.task.project"
              :projects="projects"
              label="Project"
              :showAvatar="false"
            ></ch-project-picker>
            <q-input
              v-model="editedEntry.task.description"
              outlined
              label="Description"
            ></q-input>
          </q-form>
          <q-btn
            class="q-mt-md"
            outlined
            icon="mdi-sticker-plus-outline"
            label="Copy Task"
            @click="copyTaskWithEntry"
            v-close-popup
          />
          <q-card-actions align="right" class="text-primary">
            <q-btn
              flat
              label="Cancel"
              @click="
                editorDialog = false
                timerSet()
              "
            />
            <q-btn flat label="Save" @click="saveTask()" />
          </q-card-actions>
          <div class="text-h6">Edit Entry</div>
          <q-form ref="entryForm" class="q-gutter-md" @submit.prevent>
            <q-input
              v-model="editedEntry.description"
              outlined
              label="Description"
            ></q-input>
            <q-input
              v-model="editedEntry.date"
              mask="####-##-##"
              outlined
              label="Date"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="editedEntry.date"
                      mask="YYYY-MM-DD"
                      first-day-of-week="1"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              v-model="editedEstimatedTime"
              mask="time"
              :rules="['time']"
              fill-mask
              debounce="300"
              label="Estimated Time"
              outlined
              class="q-pb-none"
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="editedEstimatedTime" format24h>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <div class="q-gutter-sm q-ma-sm">
              <q-btn
                no-caps
                padding="sm"
                rounded
                shadow-1
                icon="mdi-refresh"
                @click="editedEntry.timerEstimatedTime = 0"
                exact
              >
              </q-btn>
              <q-btn-group
                rounded
              >
              <q-btn
              v-for="addition in timerAdditionOptions"
                :key="addition"
                no-caps
                padding="sm"
                shadow-1
                @click="editedEntry.timerEstimatedTime += 60 * addition"
                exact
              >
                  <q-tooltip>Add {{addition}} minutes to timer</q-tooltip>
                  +{{addition}}m
                </q-btn>
              </q-btn-group>
            </div>
            <q-input
              v-model="editedEntryTime"
              mask="time"
              :rules="['time']"
              fill-mask
              debounce="300"
              label="Tracked Time"
              outlined
              class="q-pb-none"
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="editedEntryTime" format24h>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <div class="q-gutter-sm q-ma-sm">
              <q-btn
                no-caps
                padding="sm"
                rounded
                shadow-1
                icon="mdi-refresh"
                @click="editedEntry.timerTrackedTime = 0"
                exact
              >
              </q-btn>
              <q-btn-group
                rounded
              >
              <q-btn
              v-for="addition in timerAdditionOptions"
                :key="addition"
                no-caps
                padding="sm"
                shadow-1
                @click="editedEntry.timerTrackedTime += 60 * addition"
                exact
              >
                  <q-tooltip>Add {{addition}} minutes to timer</q-tooltip>
                  +{{addition}}m
                </q-btn>
              </q-btn-group>
            </div>
            <q-btn
              outlined
              icon="mdi-plus-circle-multiple-outline"
              label="Add Entry"
              @click="addEntryToTask"
            />
            <q-btn
              outlined
              icon="mdi-delete"
              label="Delete"
              @click="deleteDialog = true"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Cancel"
            @click="
              editorDialog = false
              timerSet()
            "
          />
          <q-btn flat label="Save" @click="saveEntry()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure you'd like to delete this?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="warning"
            @click="deletePaginatedEntry(entry) && (editorDialog = false)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="taskDetailsDialog" v-close-popup>
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
          <div
            class="text-subtitle-2 text-weight-medium text-left font-m-medium"
          >
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
                      taskDetails.aggregates.sum.timerEstimatedTime / 3600,
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
                      taskDetails.aggregates.sum.timerTrackedTime / 3600,
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
                <div
                  class="row"
                  v-for="entry in taskDetails.nodes"
                  :key="entry.id"
                >
                  <q-icon
                    v-if="entry.complete"
                    name="mdi-check"
                    class="q-mr-sm"
                  />
                  <q-icon v-else name="mdi-blank" class="q-mr-sm" />
                  {{ entry.date }}
                  -
                  {{
                    secondsToTimestamp(entry.timerTrackedTime, {
                      zeroPad: true,
                    })
                  }}
                  -
                  {{ entry.description }}
                </div>
              </div>
              <div class="col col-12 col-md-6">
                <ccv-stacked-bar-chart
                  :data="barChart.data"
                  :options="barChart.options"
                ></ccv-stacked-bar-chart>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="tasksSimilarDialog" v-close-popup>
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
          <div
            class="text-subtitle-2 text-weight-medium text-left font-m-medium"
          >
            {{ entry.task.description }}
          </div>
        </q-card-section>
        <q-card-section class="row items-center">
          <div class="col col-12" style="min-width: 200px">
            <div class="row">
              <div class="col col-12" style="height: 400px">
                <ccv-stacked-bar-chart
                  :data="barChartSimilar.data"
                  :options="barChartSimilar.options"
                ></ccv-stacked-bar-chart>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Q_PROJECT, Q_TASK_DETAILS } from '@/graphql/queries'

import ChProjectPicker from '@/components/ProjectPicker'
import {
  Q_STATS_TIME_ENTRY,
  Q_STATS_TIME_SIMILAR_TASK,
} from '@/graphql/queries'

import utils from '@/common/utils'

// import { formatTick } from '@carbon/charts/services/time-series'

export default {
  name: 'Entry',
  props: {
    entry: {
      type: Object,
    },
  },
  components: {
    ChProjectPicker,
  },
  apollo: {
    projects: {
      query: Q_PROJECT,
    },
    taskDetails: {
      query: Q_TASK_DETAILS,
      skip() {
        return !this.taskDetailsDialog
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
          console.log('DATA', data)
          const listSums = data.statsTimeEntry.groupedAggregates
          const barChartData = listSums.reduce((acc, curr) => {
            if (!acc[curr.keys[0]]) acc[curr.keys[0]] = {}
            acc[curr.keys[0]][curr.keys[1]] = curr.sum
            return acc
          }, {})
          console.log(barChartData)
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
          this.barChartData = formatted
        } else {
          this.barChartData = []
        }
      },
    },
    statsTimeSimilarTask: {
      query: Q_STATS_TIME_SIMILAR_TASK,
      skip() {
        return !this.tasksSimilarDialog
      },
      variables() {
        return {
          groupBy: ['ENTRY_WEEK_NUMBER', 'ENTRY_COMPLETE'],
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
          console.log(barChartData)
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
          const datesDomain = this.weekSpreadSequential(dateMin, dateMax)
          this.barChartSimilarDomain = datesDomain
          this.barChartSimilarData = formatted
        } else {
          this.barChartSimilarData = []
        }
      },
    },
  },
  data: () => ({
    entryRules: [(v) => !!v || 'Description required'],
    timerTrackedTime: null,
    timerInterval: null,
    editorDialog: false,
    editedEntry: null,
    deleteDialog: null,
    taskDetailsDialog: null,
    tasksSimilarDialog: null,
    taskDetailsTaskId: null,
    barChartData: [],
    barChartSimilarData: [],
    timerAdditionOptions: [5, 10, 15, 20, 30],
  }),
  created() {
    this.timerSet()
  },
  watch: {
    $props: {
      deep: true,
      handler() {
        this.timerSet()
      },
    },
  },
  computed: {
    editedEntryTime: {
      get() {
        return this.secondsToTimestamp(this.editedEntry.timerTrackedTime, {
          zeroPad: true,
        })
      },
      set(timestamp) {
        this.editedEntry.timerTrackedTime = this.timestampToSeconds(timestamp)
      },
    },
    editedEstimatedTime: {
      get() {
        return this.secondsToTimestamp(this.editedEntry.timerEstimatedTime, {
          zeroPad: true,
        })
      },
      set(timestamp) {
        this.editedEntry.timerEstimatedTime = this.timestampToSeconds(timestamp)
      },
    },
    barChart() {
      return {
        data: this.barChartData,
        options: {
          axes: {
            left: {
              title: 'Time',
              mapsTo: 'value',
              stacked: true,
              ticks: {
                formatter: this.hoursToReadable,
              },
            },
            bottom: {
              mapsTo: 'date',
              scaleType: 'time',
              // ticks: {
              //   formatter: (t, i) =>
              //     formatTick(t, i, [0, 1, 2], 'daily', {
              //       showDayName: false,
              //       timeIntervalFormats: {
              //         daily: { primary: 'MMM d', secondary: 'd' },
              //       },
              //     }),
              //   number: 8,
              // },
            },
          },
          color: {
            scale: {
              Tracked: '#22bb22',
              Estimated: '#bbb',
            },
          },
          legend: {
            position: 'top',
            order: ['Tracked', 'Estimated'],
          },
          height: '400px',
        },
      }
    },
    barChartSimilar() {
      return {
        data: this.barChartSimilarData,
        options: {
          axes: {
            left: {
              title: 'Time',
              mapsTo: 'value',
              stacked: true,
              ticks: {
                formatter: this.hoursToReadable,
              },
            },
            bottom: {
              scaleType: 'labels',
              mapsTo: 'date',
              domain: this.barChartSimilarDomain,
            },
          },
          color: {
            scale: {
              Tracked: '#22bb22',
              Estimated: '#bbb',
            },
          },
          legend: {
            position: 'top',
            order: ['Tracked', 'Estimated'],
          },
          height: '400px',
        },
      }
    },
    progress() {
      if (this.entry.timerEstimatedTime !== 0) {
        return this.timerTrackedTime / this.entry.timerEstimatedTime
      } else {
        return 0
      }
    },
    timerLabel() {
      return (
        this.secondsToTimestamp(this.timerTrackedTime, {
          includeSeconds: true,
        }) +
        '<small>/' +
        this.secondsToTimestamp(this.entry.timerEstimatedTime) +
        '</small>'
      )
    },
  },
  methods: {
    weekSpreadSequential: utils.weekSpreadSequential,
    // timer
    timerSet() {
      this.timerTrackedTime = this.entry.timerTrackedTime
      if (this.entry.timerActive) {
        this.timerTrackedTime += parseInt(
          (Date.now() - new Date(this.entry.timerStartedAt).getTime()) / 1000,
        )
      }
      if (this.entry.timerActive) {
        this.timerStart()
      } else {
        this.timerStop()
      }
    },
    timerStart() {
      clearInterval(this.timerInterval)
      this.timerInterval = setInterval(() => (this.timerTrackedTime += 1), 1000)
    },
    timerStop() {
      clearInterval(this.timerInterval)
    },
    addEntryToTask() {
      var entry = {
        description: this.entry.description,
        date: this.entry.date,
        taskId: this.entry.task.id,
        timerEstimatedTime: this.entry.timerEstimatedTime,
      }
      this.createEntryPaginated(entry)
      this.editorDialog = false
    },
    copyTaskWithEntry() {
      var entryWithTask = {
        description: this.entry.task.description,
        projectId: this.entry.task.project.id,
        date: this.entry.date,
        timerEstimatedTime: this.entry.timerEstimatedTime,
      }
      this.createEntryWithTask(entryWithTask)
    },
    // editor
    editorOpen() {
      this.editedEntry = Object.assign({}, this.entry)
      this.editorDialog = true
    },
    saveEntry() {
      this.$refs.entryForm.validate().then((success) => {
        if (success) {
          this.editorDialog = false
          this.updateEntry(this.editedEntry)
        }
      })
    },
    saveTask() {
      // Add mandatory project to validation
      this.$refs.taskForm.validate().then((success) => {
        if (success) {
          this.editorDialog = false
          const task = this.editedEntry.task
          this.updateTask({
            id: task.id,
            projectId: task.project.id,
            description: task.description,
          })
        }
      })
    },
    showTaskDetails() {
      this.taskDetailsTaskId = this.entry.task.id
      this.taskDetailsDialog = true
    },
    showSimilarTasks() {
      this.taskDetailsTaskId = this.entry.task.id
      this.tasksSimilarDialog = true
    },
  },
}
</script>

<style>
.q-btn--outline .q-btn__wrapper::before {
  border: 2.5px solid;
}
.bx--chart-holder.fullscreen {
  background-color: white;
  padding: 50px;
}
</style>