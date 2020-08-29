<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6 text-left">{{ task.description }}</div>
      </q-card-section>
      <q-card-actions align="left">
        <q-btn
          color="red"
          outline
          v-if="task.timerActive"
          @click="taskTimerStop(task)"
          icon="mdi-stop"
          :label="secondsToString"
        ></q-btn>
        <q-btn
          color="green"
          outline
          v-else
          @click="taskTimerStart(task)"
          icon="mdi-play"
          :label="secondsToString"
        ></q-btn>
        <q-space />
        <q-btn-group flat>
          <q-btn
            v-if="task.complete"
            flat
            color="orange"
            @click="task.complete = false; taskUpdate(task)"
            icon="mdi-undo-variant"
          ></q-btn>
          <q-btn
            v-else
            flat
            color="green"
            @click="task.complete = true; taskUpdate(task)"
            icon="mdi-check"
          ></q-btn>

          <q-btn flat color="red" @click="taskDelete(task)" icon="mdi-close"></q-btn>
          <q-btn flat color="grey" @click="editorOpen()" icon="mdi-pencil"></q-btn>
        </q-btn-group>
      </q-card-actions>
    </q-card>
    <q-dialog v-if="editedTask != null" v-model="editorDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit Card</div>
          <q-form ref="form" @submit.prevent>
            <q-input v-model="editedTask.description" r></q-input>
            <q-input v-model="editedTask.date" mask="####-##-##">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="editedTask.date" mask="YYYY-MM-DD" first-day-of-week="1">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input v-model="editedTaskTime" mask="time" :rules="['time']">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="editedTaskTime" format24h>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="editorDialog = false; timerSet()" />
          <q-btn flat label="Save" @click="editorSave()" />
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
} from '@/store/actions.type'

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
    },
  },
  data: () => ({
    taskRules: [(v) => !!v || 'Description required'],
    timerTrackedTime: null,
    timerInterval: null,
    editorDialog: false,
    editedTask: null,
  }),
  created() {
    this.timerSet()
  },
  filters: {
    zeroPad: function (value, num) {
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
      this.$refs.form.validate().then((success) => {
        if (success) {
          console.log(this.editedTask)
          this.editorDialog = false
          this.taskUpdate(this.editedTask)
        }
      })
    },
  },
}
</script>
