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
          @click="stopEntry(entry)"
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
            round
            @click="completeEntry(entry.id)"
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
            @click="deleteEntry(entry)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Q_PROJECT } from '@/graphql/queries'

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
      }
      this.createEntry(entry)
      this.editorDialog = false
    },
    // editor
    editorOpen() {
      this.editedEntry = Object.assign({}, this.entry)
      if (this.entry.timerActive) this.stopEntry(this.entry)
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
  },
}
</script>

<style>
.q-btn--outline .q-btn__wrapper::before {
  border: 2.5px solid;
}
</style>