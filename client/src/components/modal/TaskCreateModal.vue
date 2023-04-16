<template>
  <q-dialog v-model="showModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Add Task</div>
        <q-form ref="taskForm" class="q-gutter-md" @submit.prevent>
          <q-input
            class="q-pa-sm"
            outlined
            v-model="taskDescription"
            label="New Task"
            @keydown.enter="createTaskLocal"
          ></q-input>
        </q-form>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="showModal = false" />
        <q-btn flat label="Add" @click="createTaskLocal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'TaskCreateModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    project: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    taskDescription: null,
  }),
  computed: {
    showModal: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit('hide', value)
      },
    },
  },
  methods: {
    createTaskLocal() {
      this.showModal = false
      const newTask = {
        projectId: this.project.id,
        description: this.taskDescription,
      }
      this.createTask(newTask)
      this.taskDescription = null
    },
  },
}
</script>

<style></style>
