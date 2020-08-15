<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="3">
          <v-menu
            ref="datePicker"
            v-model="datePicker"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startDate"
                label="Start date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="startDate">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="datePicker = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.datePicker.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="3">
          <h3>{{ remainingTasks }} Task(s) to complete</h3>
        </v-col>
        <v-col cols="12" md="3">
          <v-switch v-model="hideCompleted" inset label="Hide Completed Tasks"></v-switch>
        </v-col>
      </v-row>
      <v-row style="align-content: center" no-gutters>
        <v-col v-if="dateZoomed">
          <ch-task-list :date="dateZoomed" :dateZoomed="dateZoomed" :tasks="filteredTasks" />
        </v-col>
        <v-col v-else v-for="date in dateSpread" :key="date" class="mx-2">
          <ch-task-list :date="date" :tasks="filteredTasks" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState({
      tasks: state => state.home.tasks,
      dateZoomed: state => state.home.dateZoomed,
    }),
    filteredTasks() {
      var tasks_filtered = this.tasks
      if (this.hideCompleted) {
        tasks_filtered = tasks_filtered.filter(task => task.complete == false)
      }
      return tasks_filtered
    },
    completedTasks() {
      return this.tasks.filter(task => task.complete).length
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks
    },
    dateSpread() {
      return Array.from(Array(7).keys()).map(num =>
        new Date(new Date(this.startDate).getTime() + num * 86400000)
          .toISOString()
          .substring(0, 10),
      )
    },
  },
}
</script>

<style scoped>
.custom7cols {
  width: 14%;
  max-width: 14%;
  flex-basis: 14%;
}
</style>