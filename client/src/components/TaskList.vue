<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col">
        <h5 class="text-weight-light q-my-none float-left">{{ date }}</h5>
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
      <div class="col col-12">
        <q-input filled v-model="newTask" label="New Task" @keydown.enter="taskCreate"></q-input>
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
    newTask: null,
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
    ...mapFields(['home.projectSelected']),
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
  },
  methods: {
    taskCreate() {
      var task = {
        description: this.newTask,
        date: this.date,
      }
      if (this.projectSelected) {
        task.project = this.projectSelected._id
      }
      this.$store.dispatch(A_TASK_CREATE, task)
      this.newTask = null
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