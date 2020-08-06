<template>
  <div>
    <v-container style="max-width: 500px">
      <div class="text-body-1">You have {{ remainingTasks }} tasks to complete</div>
      <br />
      <v-text-field v-model="newTask" label="Remember the milk" solo @keydown.enter="taskCreate"></v-text-field>
      <v-card v-if="tasks.length > 0">
        <v-slide-y-transition class="py-0" group tag="v-list">
          <template v-for="(task, i) in tasks">
            <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
            <Task :key="task._id" :task="task"></Task>
          </template>
        </v-slide-y-transition>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Task from '@/components/Task.vue'
import { A_TASK_RETRIEVE, A_TASK_CREATE } from '@/store/actions.type'

export default {
  name: 'TaskList',
  data: () => ({
    newTask: null,
  }),
  components: {
    Task,
  },
  computed: {
    ...mapState({
      username: state => state.auth.user.username,
      tasks: state => state.home.tasks,
    }),
    completedTasks() {
      return this.tasks.filter(task => task.complete).length
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks
    },
  },
  mounted() {
    this.taskRetrieve()
  },
  methods: {
    taskCreate() {
      this.$store.dispatch(A_TASK_CREATE, this.newTask)
      this.newTask = null
    },
    taskRetrieve() {
      this.$store.dispatch(A_TASK_RETRIEVE)
    },
  },
}
</script>