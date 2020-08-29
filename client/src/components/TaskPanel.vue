<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-4 q-pa-md">
        <q-input filled v-model="startDate" mask="####-##-##" label="Start date">
          <template v-slot:append>
            <q-icon name="mdi-calendar" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="startDate"
                  first-day-of-week="1"
                  @input="() => $refs.qDateProxy.hide()"
                  mask="YYYY-MM-DD"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
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
      <div v-else v-for="date in dateSpread" :key="date" class="custom7cols">
        <ch-task-list :date="date" :tasks="getTaskList(date)" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { A_TASK_RETRIEVE } from '@/store/actions.type'
import ChTaskList from '@/components/TaskList.vue'

export default {
  name: 'TaskPanel',
  components: {
    ChTaskList,
  },
  data: () => ({
    startDate: '2020-08-03',
    datePicker: false,
    hideCompleted: true,
  }),
  mounted() {
    this.taskRetrieve()
  },
  computed: {
    ...mapState({
      tasks: (state) => state.home.tasks,
      dateZoomed: (state) => state.home.dateZoomed,
    }),
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
    dateSpread() {
      return Array.from(Array(7).keys()).map((num) =>
        new Date(new Date(this.startDate).getTime() + num * 86400000)
          .toISOString()
          .substring(0, 10),
      )
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