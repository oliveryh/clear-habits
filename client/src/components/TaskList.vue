<template>
  <div>
    <v-container>
      <h3 class="font-weight-light">{{ date }}</h3>
      <br />
      <v-text-field
        outlined
        v-model="newTask"
        label="Remember the milk"
        solo
        @keydown.enter="taskCreate"
      ></v-text-field>
      <v-slide-y-transition group tag="v-row">
        <template transition="slide-y-transition" v-for="task in filteredTasks">
          <v-col cols="12" :key="task._id" :v-for="task in filteredTasks">
            <Task :key="task._id" :task="task" />
          </v-col>
        </template>
      </v-slide-y-transition>
    </v-container>
  </div>
</template>
<script>
import Task from '@/components/Task.vue'
import { A_TASK_RETRIEVE, A_TASK_CREATE } from '@/store/actions.type'

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
  },
}
</script>

<style scoped>
.col {
  padding: 5px 0px;
}
</style>