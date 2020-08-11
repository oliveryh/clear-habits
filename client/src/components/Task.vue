<template>
  <div>
    <v-card outlined class="rounded-card">
      <v-card-title :class="task.complete && 'grey--text' || 'primary--text'">
        <div class="card-title">{{ task.description }}</div>
      </v-card-title>

      <v-card-actions style="height: 55px">
        <v-btn
          outlined
          rounded
          class="timer-button"
          v-if="task.timerActive"
          color="orange"
          @click="taskTimerStop(task)"
        >
          <v-icon left>mdi-stop</v-icon>
          {{ secondsToString }}
        </v-btn>
        <v-btn
          outlined
          rounded
          class="timer-button"
          v-else
          color="green"
          @click="taskTimerStart(task)"
        >
          <v-icon left>mdi-play</v-icon>
          {{ secondsToString }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-checkbox
          v-model="task.complete"
          @change="taskUpdate(task)"
          :color="task.complete && 'grey' || 'primary'"
        ></v-checkbox>
        <v-btn icon rounded color="red" @click="taskDelete(task)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn icon rounded @click="editorOpen()">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-if="editedTask != null" v-model="editorDialog" max-width="392">
      <v-card>
        <v-card-title class="headline">Edit Card</v-card-title>

        <v-card-text>
          <v-form ref="form" @submit.prevent>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    :rules="taskRules"
                    label="Description"
                    v-model="editedTask.description"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-time-picker v-model="editedTaskTime" label="Time Taken" format="24hr"></v-time-picker>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="editorDialog = false; timerSet()">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="editorSave()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  A_TASK_UPDATE,
  A_TASK_DELETE,
  A_TASK_TIMER_START,
  A_TASK_TIMER_STOP,
} from '@/store/actions.type'

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
    },
  },
  data: () => ({
    taskRules: [v => !!v || 'Description required'],
    timerTrackedTime: null,
    timerInterval: null,
    editorDialog: false,
    editedTask: null,
  }),
  created() {
    this.timerSet()
  },
  filters: {
    zeroPad: function(value, num) {
      num = typeof num !== 'undefined' ? num : 2
      return value.toString().padStart(num, '0')
    },
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
    editedTaskTime: {
      get() {
        var tt = this.editedTask.timerTrackedTime
        var hours = this.$options.filters.zeroPad(parseInt(tt / 3600))
        var minutes = this.$options.filters.zeroPad(parseInt((tt % 3600) / 60))
        return `${hours}:${minutes}`
      },
      set(val) {
        var parts = val.split(':')
        var hours = parseInt(parts[0])
        var minutes = parseInt(parts[1])
        this.editedTask.timerTrackedTime = hours * 3600 + minutes * 60
      },
    },
    secondsToString: {
      get() {
        var tt = this.timerTrackedTime
        var hours = this.$options.filters.zeroPad(parseInt(tt / 3600))
        var minutes = this.$options.filters.zeroPad(parseInt((tt % 3600) / 60))
        var seconds = this.$options.filters.zeroPad(parseInt(tt % 60))
        return `${hours}:${minutes}:${seconds}`
      },
      set(val) {
        var parts = val.split(':')
        var hours = parseInt(parts[0])
        var minutes = parseInt(parts[1])
        var seconds = parseInt(parts[2])
        this.timerTrackedTime = hours * 3600 + minutes * 60 + seconds
      },
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
    // editor
    editorOpen() {
      this.editedTask = Object.assign({}, this.task)
      if (this.task.timerActive) this.taskTimerStop(this.task)
      this.editorDialog = true
    },
    editorSave() {
      if (this.editorValidate()) {
        this.taskUpdate(this.editedTask)
        this.editorDialog = false
      }
    },
    editorValidate() {
      if (this.$refs.form.validate()) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<style scoped>
.rounded-card {
  border-radius: 20px;
}

.timer-button {
  padding: 0px 12px !important;
}
</style>
