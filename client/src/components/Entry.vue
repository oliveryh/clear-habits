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
              highContrastColor
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
        </div>
        <div
          v-if="entry.description"
          class="text-subtitle-2 text-weight-medium text-left font-m-light"
        >
          {{ entry.description }}
        </div>
      </q-card-section>
      <q-card-actions align="left" style="margin: 2px">
        <q-btn
          color="red-12"
          push
          dense
          class="font-m-medium"
          style="border-radius: 10px; border: 4px"
          v-if="entry.timerActive"
          @click="entryTimerStop(entry)"
          icon="mdi-stop"
        >
          <div v-html="timerLabel"></div
        ></q-btn>
        <q-btn
          :color="timerTrackedTime > 0 ? 'orange' : 'green-14'"
          outline
          dense
          class="font-m-medium"
          style="background: #ff0080; border-radius: 10px; border: 4px"
          v-else
          @click="entryTimerStart(entry)"
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
            @click="
              entry.complete = false
              entryRestart(entry)
            "
            icon="mdi-undo-variant"
          ></q-btn>
          <q-btn
            v-else
            flat
            color="green"
            dense
            round
            @click="entryComplete(entry)"
            icon="mdi-check"
          ></q-btn>
          <q-btn
            class="q-px-none"
            flat
            color="grey"
            round
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
            <q-input
              v-model="editedEntryTime"
              mask="time"
              :rules="['time']"
              label="Tracked Time"
              outlined
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
            @click="entryDelete(entry)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  M_ENTRY_START,
  M_ENTRY_STOP,
  M_ENTRY_UPDATE,
  M_ENTRY_COMPLETE,
  M_ENTRY_RESTART,
  M_ENTRY_DELETE,
  M_ENTRY_CREATE,
  M_TASK_UPDATE,
} from '@/graphql/mutations'
import { Q_ENTRY, Q_TASK, Q_PROJECT } from '@/graphql/queries'

import ChProjectPicker from '@/components/ProjectPicker'

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
  },
  data: () => ({
    entryRules: [(v) => !!v || 'Description required'],
    timerTrackedTime: null,
    timerInterval: null,
    editorDialog: false,
    editedEntry: null,
    deleteDialog: null,
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
        return this.minutesToTimestamp(this.editedEntry.timerTrackedTime)
      },
      set(val) {
        this.editedEntry.timerTrackedTime = this.timestampToMinutes(val)
      },
    },
    highContrastColor() {
      const rgbObj = this.hexToRgb(this.entry.task.project.category.color)
      return this.highContrastText(rgbObj)
    },
    editedEstimatedTime: {
      get() {
        return this.minutesToTimestamp(this.editedEntry.timerEstimatedTime)
      },
      set(val) {
        this.editedEntry.timerEstimatedTime = this.timestampToMinutes(val)
      },
    },
    trackedTime: {
      get() {
        return this.secondsToTimestamp(this.timerTrackedTime)
      },
      set(val) {
        this.timerTrackedTime = this.timestampToSeconds(val)
      },
    },
    estimatedTime() {
      return this.secondsToTimestamp(this.entry.timerEstimatedTime)
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
        this.trackedTime +
        '<small>/' +
        this.estimatedTime.slice(0, -3) +
        '</small>'
      )
    },
  },
  methods: {
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
    // entry
    entryUpdate(entry) {
      this.$apollo.mutate({
        mutation: M_ENTRY_UPDATE,
        variables: entry,
        update: (store, { data: { entryUpdate } }) => {
          const data = store.readQuery({
            query: Q_ENTRY,
          })
          const alteredEntry = data.entries.find((e) => e.id === entry.id)
          Object.assign(alteredEntry, entryUpdate)
          store.writeQuery({
            query: Q_ENTRY,
            data,
          })
        },
      })
    },
    taskUpdate(task) {
      this.$apollo.mutate({
        mutation: M_TASK_UPDATE,
        variables: task,
        update: (store, { data: { taskUpdate } }) => {
          const data = store.readQuery({
            query: Q_TASK,
          })
          const alteredTask = data.tasks.find((e) => e.id === task.id)
          Object.assign(alteredTask, taskUpdate)
          store.writeQuery({
            query: Q_TASK,
            data,
          })
        },
      })
    },
    entryDelete(entry) {
      this.$apollo.mutate({
        mutation: M_ENTRY_DELETE,
        variables: {
          id: entry.id,
        },
        update: (store, { data: { entryDelete } }) => {
          if (entryDelete) {
            const data = store.readQuery({
              query: Q_ENTRY,
            })
            data.entries = data.entries.filter((e) => {
              return e.id !== entry.id
            })
            store.writeQuery({
              query: Q_ENTRY,
              data,
            })
          }
        },
      })
    },
    entryTimerStop(entry) {
      this.$apollo.mutate({
        mutation: M_ENTRY_STOP,
        variables: {
          id: entry.id,
        },
        update: (store, { data: { entryStop } }) => {
          const data = store.readQuery({
            query: Q_ENTRY,
          })
          const alteredEntry = data.entries.find((e) => e.id === entry.id)
          Object.assign(alteredEntry, entryStop)
          store.writeQuery({
            query: Q_ENTRY,
            data,
          })
        },
      })
    },
    entryTimerStart(entry) {
      this.$apollo.mutate({
        mutation: M_ENTRY_START,
        variables: {
          id: entry.id,
        },
        update: (store, { data: { entryStart } }) => {
          const data = store.readQuery({
            query: Q_ENTRY,
          })
          const alteredEntry = data.entries.find((e) => e.id === entry.id)
          Object.assign(alteredEntry, entryStart)
          store.writeQuery({
            query: Q_ENTRY,
            data,
          })
        },
      })
    },
    entryComplete(entry) {
      this.$apollo.mutate({
        mutation: M_ENTRY_COMPLETE,
        variables: {
          id: entry.id,
        },
        update: (store, { data: { entryComplete } }) => {
          const data = store.readQuery({
            query: Q_ENTRY,
          })
          const alteredEntry = data.entries.find((e) => e.id === entry.id)
          Object.assign(alteredEntry, entryComplete)
          store.writeQuery({
            query: Q_ENTRY,
            data,
          })
        },
      })
    },
    entryRestart(entry) {
      this.$apollo.mutate({
        mutation: M_ENTRY_RESTART,
        variables: {
          id: entry.id,
        },
        update: (store, { data: { entryRestart } }) => {
          const data = store.readQuery({
            query: Q_ENTRY,
          })
          const alteredEntry = data.entries.find((e) => e.id === entry.id)
          Object.assign(alteredEntry, entryRestart)
          store.writeQuery({
            query: Q_ENTRY,
            data,
          })
        },
      })
    },
    addEntryToTask() {
      var entry = {
        description: this.entry.description,
        date: this.entry.date,
        taskId: this.entry.task.id,
      }
      this.$apollo
        .mutate({
          mutation: M_ENTRY_CREATE,
          variables: entry,
          update: (store, { data: { entryCreate } }) => {
            const data = store.readQuery({
              query: Q_ENTRY,
            })
            data.entries.push(entryCreate)
            store.writeQuery({
              query: Q_ENTRY,
              data,
            })
          },
        })
        .catch((error) => {
          this.showErrors(error)
        })
      this.editorDialog = false
    },
    // editor
    editorOpen() {
      this.editedEntry = Object.assign({}, this.entry)
      if (this.entry.timerActive) this.entryTimerStop(this.entry)
      this.editorDialog = true
    },
    saveEntry() {
      this.$refs.entryForm.validate().then((success) => {
        if (success) {
          this.editorDialog = false
          this.entryUpdate(this.editedEntry)
        }
      })
    },
    saveTask() {
      // Add mandatory project to validation
      this.$refs.taskForm.validate().then((success) => {
        if (success) {
          this.editorDialog = false
          const task = this.editedEntry.task
          this.taskUpdate({
            id: task.id,
            projectId: task.project.id,
            description: task.description,
          })
        }
      })
    },
  },
}
</script>

<style>
.q-btn--outline .q-btn__wrapper::before {
  border: 2.5px solid;
}
</style>