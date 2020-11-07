<template>
  <div>
    <q-card class="my-card">
      <q-card-section>
        <div class="row">
          <div class="text-h6">{{ project.description }}</div>
          <q-space />
          <q-btn flat style="display: inline" color="grey" @click="editorOpen()" icon="mdi-pencil"></q-btn>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-if="editedProject != null" v-model="editorDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit Project</div>
          <q-form ref="form" @submit.prevent>
            <q-input v-model="editedProject.description" r></q-input>
          </q-form>
          <q-btn outline icon="mdi-delete" label="Delete" @click="deleteDialog = true" />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="editorDialog = false; timerSet()" />
          <q-btn flat label="Save" @click="editorSave()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure you'd like to delete this?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="warning" @click="projectDelete(project)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { A_PROJECT_UPDATE, A_PROJECT_DELETE } from '@/store/actions.type'

export default {
  name: 'Project',
  props: {
    project: {
      type: Object,
    },
  },
  data: () => ({
    projectRules: [(v) => !!v || 'Description required'],
    editorDialog: false,
    editedProject: null,
    deleteDialog: false,
  }),
  methods: {
    // project
    projectUpdate(project) {
      this.$store.dispatch(A_PROJECT_UPDATE, project)
    },
    projectDelete(project) {
      this.$store.dispatch(A_PROJECT_DELETE, project)
    },
    // editor
    editorOpen() {
      this.editedProject = Object.assign({}, this.project)
      this.editorDialog = true
    },
    editorSave() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.editorDialog = false
          this.projectUpdate(this.editedProject)
        }
      })
    },
  },
}
</script>
