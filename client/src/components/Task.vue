<template>
  <v-card outlined class="rounded-card">
    <v-card-title :class="task.complete && 'grey--text' || 'primary--text'">
      <div
        @click="editedTask=task"
        v-if="editedTask == null || editedTask._id !== task._id"
        class="card-title"
      >{{ task.description }}</div>
      <v-form ref="form" :lazy-validation="true" v-else v-on:submit.prevent>
        <v-text-field
          class="ml-4"
          :rules="taskRules"
          v-model="task.description"
          @keyup.enter="validateEdit() && taskUpdate(task)"
        ></v-text-field>
      </v-form>
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
        {{ hours }}:{{ minutes | zeroPad }}:{{ seconds | zeroPad }}
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
        {{ hours }}:{{ minutes | zeroPad }}:{{ seconds | zeroPad }}
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
    </v-card-actions>
  </v-card>
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
    editedTask: null,
    taskRules: [v => !!v || 'Description required'],
    timerTrackedTime: null,
    timerInterval: null,
  }),
  created() {
    this.setTimer()
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
        this.setTimer()
      },
    },
  },
  computed: {
    hours() {
      return parseInt(this.timerTrackedTime / 3600)
    },
    minutes() {
      return parseInt((this.timerTrackedTime % 3600) / 60)
    },
    seconds() {
      return parseInt(this.timerTrackedTime % 60)
    },
  },
  methods: {
    setTimer() {
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
      if (!this.timerInterval) {
        this.timerInterval = setInterval(
          () => (this.timerTrackedTime += 1),
          1000,
        )
      }
    },
    timerStop() {
      clearInterval(this.timerInterval)
    },
    validateEdit() {
      if (this.$refs.form.validate()) {
        this.editedTask = null
        return true
      } else {
        return false
      }
    },
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
