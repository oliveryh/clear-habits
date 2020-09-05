<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-4 q-pa-md">
        <ch-day-selector v-if="dateZoomed" v-model="dateZoomed"></ch-day-selector>
        <ch-week-selector v-else v-model="startDate"></ch-week-selector>
      </div>
      <div class="col-12 col-md-4 align-center q-pa-md">
        <h6 class="q-my-none">{{ remainingTasks }} Task(s) to complete</h6>
      </div>
      <div class="col-12 col-md-4 align-center q-pa-md">
        <q-toggle v-model="hideCompleted" label="Hide Completed"></q-toggle>
      </div>
    </div>
    {{ date }}
    <div class="row" style="text-align: center">
      <div v-if="dateZoomed" class="col">
        <ch-task-list :date="dateZoomed" :dateZoomed="dateZoomed" :tasks="getTaskList(dateZoomed)" />
      </div>
      <div v-else v-for="date in dateSpread(startDate)" :key="date" class="custom7cols">
        <ch-task-list :date="date" :tasks="getTaskList(date)" />
      </div>
    </div>
  </div>
</template>

<script>
import ChTaskList from '@/components/TaskList.vue'
import ChWeekSelector from '@/components/WeekSelector.vue'
import ChDaySelector from '@/components/DaySelector.vue'
import { mapState } from 'vuex'
import { A_TASK_RETRIEVE } from '@/store/actions.type'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'TaskPanel',
  components: {
    ChTaskList,
    ChWeekSelector,
    ChDaySelector,
  },
  data: () => ({
    startDate: null,
    hideCompleted: true,
  }),
  mounted() {
    this.taskRetrieve()
  },
  computed: {
    ...mapState({
      tasks: (state) => state.home.tasks,
    }),
    ...mapFields(['home.dateZoomed']),
    filteredTasks() {
      var tasks_filtered = this.tasks
      if (this.hideCompleted) {
        tasks_filtered = tasks_filtered.filter((task) => task.complete == false)
      }
      return tasks_filtered
    },
    completedTasks() {
      return this.tasks.filter((task) => task.complete).length
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks
    },
  },
  methods: {
    getTaskList(date) {
      var tasks = this.filteredTasks
        .filter((task) => task.date == date)
        .sort((a, b) => a['order'] - b['order'])
      return tasks
    },
    taskRetrieve() {
      this.$store.dispatch(A_TASK_RETRIEVE)
    },
  },
}
</script>

<style scoped>
.custom7cols {
  width: 14.28%;
  max-width: 14.28%;
  flex-basis: 14.28%;
}
.align-center {
  display: flex;
  align-items: center;
}
</style>