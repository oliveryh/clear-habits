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

            <v-list-item :key="task._id">
              <v-checkbox
                v-model="task.complete"
                @change="taskUpdate(task)"
                :color="task.complete && 'grey' || 'primary'"
              ></v-checkbox>

              <div
                :class="task.complete && 'grey--text' || 'primary--text'"
                class="ml-4"
                v-text="task.description"
                @click="editedTask=task"
                v-if="editedTask == null || editedTask._id !== task._id"
              ></div>
              <v-form ref="form" :lazy-validation="true" v-else v-on:submit.prevent>
                <v-text-field
                  class="ml-4"
                  :rules="taskRules"
                  v-model="task.description"
                  @keyup.enter="validateEdit() && taskUpdate(task)"
                ></v-text-field>
              </v-form>
              <v-spacer></v-spacer>

              <v-btn icon color="red" @click="taskDelete(task)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item>
          </template>
        </v-slide-y-transition>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {
  A_TASK_RETRIEVE,
  A_TASK_CREATE,
  A_TASK_UPDATE,
  A_TASK_DELETE,
} from '@/store/actions.type'

export default {
  name: 'TaskList',
  data: () => ({
    newTask: null,
    editedTask: null,
    taskRules: [v => !!v || 'Description required'],
  }),
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
    validateEdit() {
      if (this.$refs.form[0].validate()) {
        this.editedTask = null
        return true
      } else {
        return false
      }
    },
    taskCreate() {
      this.$store.dispatch(A_TASK_CREATE, this.newTask)
      this.newTask = null
    },
    taskRetrieve() {
      this.$store.dispatch(A_TASK_RETRIEVE)
    },
    taskUpdate(task) {
      this.$store.dispatch(A_TASK_UPDATE, task)
    },
    taskDelete(task) {
      this.$store.dispatch(A_TASK_DELETE, task)
    },
  },
}
</script>