<template>
  <div>
    <div class="row">
      <div class="col-6 col-md-3 q-pa-md">
        <ch-day-selector v-if="dateZoomed" v-model="dateZoomed"></ch-day-selector>
        <ch-week-selector v-else v-model="startDate"></ch-week-selector>
      </div>
      <div class="col-6 col-md-3 q-pa-md">
        <q-toggle v-model="hideCompleted" label="Hide Completed"></q-toggle>
      </div>

      <div class="col-6 col-md-3 q-pa-md">
        <q-form ref="form" @submit.prevent>
          <ch-project-picker v-model="categorySelected" :projects="categories" label="Category"></ch-project-picker>
        </q-form>
      </div>
      <div class="col-6 col-md-3 q-pa-md">
        <q-form ref="form" @submit.prevent>
          <ch-project-picker v-model="projectSelected" :projects="filteredProjects" label="Project"></ch-project-picker>
        </q-form>
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
import ChProjectPicker from '@/components/ProjectPicker'
import { mapState } from 'vuex'
import {
  A_TASK_RETRIEVE,
  A_PROJECT_RETRIEVE,
  A_CATEGORY_RETRIEVE,
} from '@/store/actions.type'
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'TaskPanel',
  components: {
    ChTaskList,
    ChWeekSelector,
    ChDaySelector,
    ChProjectPicker,
  },
  data: () => ({
    startDate: null,
    hideCompleted: true,
    options: null,
    categorySelected: null,
  }),
  mounted() {
    this.taskRetrieve()
    this.projectsRetrieve()
    this.categoriesRetrieve()
  },
  computed: {
    ...mapState({
      tasks: (state) => state.home.tasks,
      projects: (state) => state.settings.projects,
      categories: (state) => state.settings.categories,
    }),
    ...mapFields(['home.dateZoomed', 'home.projectSelected']),
    filteredTasks() {
      var tasks_filtered = this.tasks
      if (this.hideCompleted) {
        tasks_filtered = tasks_filtered.filter((task) => task.complete == false)
      }
      if (this.categorySelected) {
        tasks_filtered = tasks_filtered.filter((task) =>
          task.project != null
            ? task.project.category._id == this.categorySelected._id
            : false,
        )
      }
      if (this.projectSelected) {
        tasks_filtered = tasks_filtered.filter((task) =>
          task.project != null
            ? task.project._id == this.projectSelected._id
            : false,
        )
      }
      return tasks_filtered
    },
    filteredProjects() {
      var projects_filtered = this.projects
      if (this.categorySelected) {
        projects_filtered = projects_filtered.filter(
          (project) => project.category._id == this.categorySelected._id,
        )
      }
      return projects_filtered
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
    projectsRetrieve() {
      this.$store.dispatch(A_PROJECT_RETRIEVE)
    },
    categoriesRetrieve() {
      this.$store.dispatch(A_CATEGORY_RETRIEVE)
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