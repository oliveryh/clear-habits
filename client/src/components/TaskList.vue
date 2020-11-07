<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col">
        <h5 class="text-weight-light q-my-none float-left">
          {{ date == 'backlog' ? 'Backlog' : date }}
        </h5>
        <q-btn
          @click="zoomOut()"
          v-if="dateZoomed"
          round
          dense
          flat
          icon="mdi-magnify-minus-outline"
          class="float-right"
          size="md"
        ></q-btn>
        <q-btn
          @click="zoomIn()"
          v-else
          round
          dense
          flat
          icon="mdi-magnify-plus-outline"
          class="float-right"
          size="md"
        ></q-btn>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h5 class="text-weight-light q-my-none">{{ timeSummary }}</h5>
      </div>
    </div>
    <div class="row">
      <div class="col col-12" :class="dateZoomed ? 'col-lg-8' : ''">
        <q-input
          class="q-pa-sm"
          outlined
          v-model="newTask.description"
          label="New Task"
          @keydown.enter="taskCreate"
        ></q-input>
      </div>
      <div class="col col-12" :class="dateZoomed ? 'col-lg-4' : ''">
        <q-input
          class="q-pa-sm"
          outlined
          v-model="newTaskEstimatedTime"
          mask="time"
          :rules="['time']"
          @keydown.enter="taskCreate"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="newTaskEstimatedTime" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <draggable
      :emptyInsertThreshold="75"
      v-model="filteredTasks"
      group="tasks"
      @change="taskChange"
      class="row"
    >
      <div class="col col-12" :key="task._id" v-for="task in filteredTasks">
        <Task :key="task._id" :task="task" />
      </div>
    </draggable>
  </div>
</template>
<script>
import Task from '@/components/Task.vue'
import draggable from 'vuedraggable'
import {
  A_TASK_CREATE,
  A_TASK_UPDATE,
  A_TASK_REORDER,
} from '@/store/actions.type'
import {
  M_CONTROL_ZOOM_ENABLE,
  M_CONTROL_ZOOM_DISABLE,
  M_TASK_UPDATE,
} from '@/store/mutations.type'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'TaskList',
  data: () => ({
    newTask: {
      description: null,
      timerEstimatedTime: null,
    },
    tasks: null,
  }),
  props: {
    date: {
      type: String,
    },
    tasks: {
      type: Array,
    },
    dateZoomed: {
      type: String,
    },
  },
  components: {
    Task,
    draggable,
  },
  computed: {
    ...mapFields(['home.projectSelected', 'home.dateZoomed']),
    filteredTasks: {
      get() {
        return this.tasks
      },
      set(reorderedTasks) {
        for (let i = 0; i < reorderedTasks.length; i++) {
          reorderedTasks[i].order = i
        }

        this.$store.dispatch(A_TASK_REORDER, {
          newDate: this.date,
          tasks: reorderedTasks,
        })
      },
    },
    newTaskEstimatedTime: {
      get() {
        return this.minutesToTimestamp(this.newTask.timerEstimatedTime)
      },
      set(val) {
        this.newTask.timerEstimatedTime = this.timestampToMinutes(val)
      },
    },
    totalEstimatedTime() {
      var sum = 0
      this.filteredTasks.filter((task) => (sum += task.timerEstimatedTime))
      return sum
    },
    totalTrackedTime() {
      var sum = 0
      this.filteredTasks.filter((task) => (sum += task.timerTrackedTime))
      return sum
    },
    timeSummary() {
      return (
        this.secondsToTimestamp(this.totalTrackedTime).slice(0, -3) +
        ' / ' +
        this.secondsToTimestamp(this.totalEstimatedTime).slice(0, -3)
      )
    },
  },
  methods: {
    taskCreate() {
      var task = {
        description: this.newTask.description,
        date: this.date,
        timerEstimatedTime: this.newTask.timerEstimatedTime,
      }
      if (this.projectSelected) {
        task.project = this.projectSelected._id
      }
      this.$store.dispatch(A_TASK_CREATE, task)
      this.newTask = {
        description: null,
        timerEstimatedTime: null,
      }
    },
    zoomOut() {
      this.$store.commit(M_CONTROL_ZOOM_DISABLE)
    },
    zoomIn() {
      this.$store.commit(M_CONTROL_ZOOM_ENABLE, this.date)
    },
    taskUpdate(task) {
      this.$store.dispatch(A_TASK_UPDATE, task)
    },
    taskChange(evt) {
      if ('added' in evt) {
        var task = evt.added.element
        task.date = this.date
        this.$store.commit(M_TASK_UPDATE, task)
      }
    },
  },
}
</script>

<style scoped>
.col {
  padding: 5px 0px;
}
</style>