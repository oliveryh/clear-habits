<template>
  <div>
    <v-container>
      <v-row>
        <v-col col="12" class="d-flex">
          <h3 class="font-weight-light">{{ date }}</h3>
          <v-spacer></v-spacer>
          <v-btn @click="zoomOut()" v-if="dateZoomed" icon>
            <v-icon>mdi-magnify-minus-outline</v-icon>
          </v-btn>
          <v-btn @click="zoomIn()" v-else icon>
            <v-icon>mdi-magnify-plus-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-text-field
          outlined
          v-model="newTask"
          label="Remember the milk"
          solo
          @keydown.enter="taskCreate"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-col col="12">
          <v-slide-y-transition group tag="v-row">
            <template transition="slide-y-transition" v-for="task in filteredTasks">
              <v-col cols="12" :key="task._id" :v-for="task in filteredTasks">
                <Task :key="task._id" :task="task" />
              </v-col>
            </template>
          </v-slide-y-transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Task from '@/components/Task.vue'
import { A_TASK_RETRIEVE, A_TASK_CREATE } from '@/store/actions.type'
import {
  M_CONTROL_ZOOM_ENABLE,
  M_CONTROL_ZOOM_DISABLE,
} from '@/store/mutations.type'

export default {
  name: 'TaskList',
  data: () => ({
    newTask: null,
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
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => task.date == this.date)
    },
  },
  mounted() {
    this.taskRetrieve()
  },
  methods: {
    taskCreate() {
      var task = {
        description: this.newTask,
        date: this.date,
      }
      this.$store.dispatch(A_TASK_CREATE, task)
      this.newTask = null
    },
    taskRetrieve() {
      this.$store.dispatch(A_TASK_RETRIEVE)
    },
    zoomOut() {
      this.$store.commit(M_CONTROL_ZOOM_DISABLE)
    },
    zoomIn() {
      this.$store.commit(M_CONTROL_ZOOM_ENABLE, this.date)
    },
  },
}
</script>

<style scoped>
.col {
  padding: 5px 0px;
}
</style>