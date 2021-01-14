<template>
  <div>
    <q-item>
      <q-item-section>{{ project.description }}</q-item-section>
      <q-item-section side>
        <q-btn round flat color="grey" icon="mdi-pencil" @click="editorOpen" />
      </q-item-section>
    </q-item>
    <q-dialog v-if="editedProject != null" v-model="editorDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit Project</div>
          <q-form ref="form" @submit.prevent>
            <q-input v-model="editedProject.description" r></q-input>
          </q-form>
          <q-btn
            outline
            icon="mdi-delete"
            label="Delete"
            @click="deleteDialog = true"
          />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Cancel"
            @click="
              editorDialog = false
              timerSet()
            "
          />
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
          <q-btn
            flat
            label="Delete"
            color="warning"
            @click="projectDelete(project)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { M_PROJECT_UPDATE, M_PROJECT_DELETE } from '@/graphql/mutations'
import { Q_PROJECT } from '@/graphql/queries'

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
      this.$apollo.mutate({
        mutation: M_PROJECT_UPDATE,
        variables: project,
        update: (store, { data: { projectUpdate } }) => {
          const data = store.readQuery({
            query: Q_PROJECT,
          })
          const alteredProject = data.projects.find((p) => p.id === project.id)
          Object.assign(alteredProject, projectUpdate)
          store.writeQuery({
            query: Q_PROJECT,
            data,
          })
        },
      })
    },
    projectDelete(project) {
      this.$apollo.mutate({
        mutation: M_PROJECT_DELETE,
        variables: project,
        update: (store, { data: { projectDelete } }) => {
          if (projectDelete) {
            const data = store.readQuery({
              query: Q_PROJECT,
            })
            data.projects = data.projects.filter((p) => {
              return p.id !== project.id
            })
            store.writeQuery({
              query: Q_PROJECT,
              data,
            })
          }
        },
      })
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
