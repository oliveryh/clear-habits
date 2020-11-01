<template>
  <div>
    <q-card flat bordered>
      <q-card-section style="padding: 10px; padding-bottom: 0px">
        <div v-if="task.project" class="text-headline text-left">
          <q-icon
            name="mdi-checkbox-blank-circle"
            :style="'color: ' + task.project.category.color"
          />
          {{ task.project.description }}
        </div>
        <div v-else class="text-headline text-left">NONE</div>
        <div class="text-subtitle-2 text-weight-medium text-left">
          {{ task.description }}
        </div>
      </q-card-section>
      <q-card-actions align="left">
        <q-btn
          color="red"
          outline
          v-if="task.timerActive"
          @click="taskTimerStop(task)"
          icon="mdi-stop"
        >
          <div v-html="timerLabel"></div
        ></q-btn>
        <q-btn
          :color="timerTrackedTime > 0 ? 'orange' : 'green'"
          outline
          v-else
          @click="taskTimerStart(task)"
          icon="mdi-play"
        >
          <div v-html="timerLabel"></div
        ></q-btn>
        <q-space />
        <q-btn-group flat>
          <q-btn
            v-if="task.complete"
            flat
            color="orange"
            @click="
              task.complete = false
              taskUpdate(task)
            "
            icon="mdi-undo-variant"
          ></q-btn>
          <q-btn
            v-else
            flat
            color="green"
            dense
            round
            @click="taskComplete(task)"
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
      </q-card-actions>
      <q-linear-progress
        :value="progress"
        rounded
        :color="task.timerEstimatedTime < timerTrackedTime ? 'red' : 'primary'"
        track-color="grey"
      />
    </q-card>
    <q-dialog v-if="editedTask != null" v-model="editorDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit Task</div>
          <q-form ref="form" class="q-gutter-md" @submit.prevent>
            <ch-project-picker
              v-model="editedTask.project"
              :projects="projects"
              label="Project"
            ></ch-project-picker>
            <q-input
              v-model="editedTask.description"
              outlined
              label="Description"
            ></q-input>
            <q-input
              v-model="editedTask.date"
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
                      v-model="editedTask.date"
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
              v-model="editedTaskTime"
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
                    <q-time v-model="editedTaskTime" format24h>
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
          <q-btn flat label="Save" @click="editorSave()" />
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
            @click="taskDelete(task)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  A_TASK_UPDATE,
  A_TASK_DELETE,
  A_TASK_TIMER_START,
  A_TASK_TIMER_STOP,
  A_TASK_COMPLETE,
} from '@/store/actions.type'
import { mapState } from 'vuex'

import ChProjectPicker from '@/components/ProjectPicker'

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
    },
  },
  components: {
    ChProjectPicker,
  },
  data: () => ({
    taskRules: [(v) => !!v || 'Description required'],
    timerTrackedTime: null,
    timerInterval: null,
    editorDialog: false,
    editedTask: null,
    selectModel: null,
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
    ...mapState({
      projects: (state) => state.settings.projects,
    }),
    editedTaskTime: {
      get() {
        return this.minutesToTimestamp(this.editedTask.timerTrackedTime)
      },
      set(val) {
        this.editedTask.timerTrackedTime = this.timestampToMinutes(val)
      },
    },
    editedEstimatedTime: {
      get() {
        return this.minutesToTimestamp(this.editedTask.timerEstimatedTime)
      },
      set(val) {
        this.editedTask.timerEstimatedTime = this.timestampToMinutes(val)
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
      return this.secondsToTimestamp(this.task.timerEstimatedTime)
    },
    progress() {
      if (this.task.timerEstimatedTime !== 0) {
        return this.timerTrackedTime / this.task.timerEstimatedTime
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
      this.timerTrackedTime = this.task.timerTrackedTime
      if (this.task.timerActive) {
        this.timerTrackedTime += parseInt(
          (Date.now() - new Date(this.task.timerStartedAt).getTime()) / 1000,
        )
      }
      if (this.task.timerActive) {
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
    // task
    taskUpdate(task) {
      this.$store.dispatch(A_TASK_UPDATE, task)
    },
    taskDelete(task) {
      this.$store.dispatch(A_TASK_DELETE, task)
    },
    taskTimerStart(task) {
      this.$store.dispatch(A_TASK_TIMER_START, task)
    },
    taskTimerStop(task) {
      this.$store.dispatch(A_TASK_TIMER_STOP, task)
    },
    taskComplete(task) {
      this.$store.dispatch(A_TASK_COMPLETE, task)
    },
    // editor
    editorOpen() {
      this.editedTask = Object.assign({}, this.task)
      if (this.task.timerActive) this.taskTimerStop(this.task)
      this.editorDialog = true
    },
    editorSave() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.editorDialog = false
          if (this.selectModel != null) {
            this.editedTask.project = this.selectModel._id
          }
          this.taskUpdate(this.editedTask)
        }
      })
    },
  },
}
</script>
