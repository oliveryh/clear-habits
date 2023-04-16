<template>
  <q-dialog v-model="showModal" v-close-popup>
    <q-card>
      <q-card-section>
        <div class="text-h6">Add Project</div>
        <q-form ref="taskForm" class="q-gutter-md" @submit.prevent>
          <q-input
            class="q-pa-sm"
            outlined
            v-model="newProjectDescription"
            label="New Project"
            @keydown.enter="createProjectLocal"
          ></q-input>
        </q-form>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="showModal = false" />
        <q-btn flat label="Add" @click="createProjectLocal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ProjectCreateModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    newProjectDescription: null,
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
    createProjectLocal() {
      this.showModal = false
      const newProject = {
        categoryId: this.category.id,
        description: this.newProjectDescription,
      }
      this.createProject(newProject)
      this.newProjectDescription = null
    },
  },
}
</script>

<style></style>
