<template>
  <div>
    <q-expansion-item
      switch-toggle-side
      expand-icon-toggle
      expand-separator
      popup
      class="has-border font-m-medium"
    >
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar
            size="sm"
            :style="'background-color:' + category.color"
            text-color="white"
            class="q-pr-xs shadow-1"
          />
        </q-item-section>
        <q-item-section>{{ category.description }}</q-item-section>
        <q-item-section avatar>
          <q-avatar color="grey" size="sm" text-color="white">{{
            category.projects.length
          }}</q-avatar>
        </q-item-section>
        <q-item-section avatar class="q-pl-md"
          ><q-btn round flat color="grey" icon="mdi-pencil" @click="editorOpen"
        /></q-item-section>
      </template>
      <q-list bordered separator>
        <Project
          v-for="project in category.projects"
          :key="project.id"
          :project="project"
        />
        <q-item>
          <q-item-section avatar>
            <q-btn
              flat
              rounded
              color="grey"
              icon="mdi-plus"
              class="font-m-bold"
              label="Add Project"
              @click="addProjectDialog = true"
          /></q-item-section>
        </q-item>
        <q-dialog v-model="addProjectDialog">
          <q-card>
            <q-card-section>
              <div class="text-h6">Add Project</div>
              <q-form ref="taskForm" class="q-gutter-md" @submit.prevent>
                <q-input
                  class="q-pa-sm"
                  outlined
                  v-model="newProjectDescription"
                  label="New Project"
                  @keydown.enter="projectCreate"
                ></q-input>
              </q-form>
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" @click="addProjectDialog = false" />
              <q-btn flat label="Add" @click="projectCreate" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-list>
    </q-expansion-item>
    <q-dialog v-if="editedCategory != null" v-model="editorDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit Category</div>
          <q-form ref="form" @submit.prevent>
            <q-input v-model="editedCategory.description" r></q-input>
            <q-input v-model="editedCategory.color" :rules="['anyColor']">
              <template v-slot:append>
                <q-icon name="mdi-eyedropper" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color v-model="editedCategory.color" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-btn
              outline
              icon="mdi-delete"
              label="Delete"
              @click="deleteDialog = true"
            />
          </q-form>
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
            @click="categoryDelete"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Project from '@/components/Project.vue'
import {
  M_CATEGORY_UPDATE,
  M_CATEGORY_DELETE,
  M_SETTINGS_UPDATE,
  M_PROJECT_CREATE,
} from '@/graphql/mutations'

import { Q_CATEGORY, Q_PROJECT } from '@/graphql/queries'

export default {
  name: 'Category',
  props: {
    category: {
      type: Object,
    },
    selected: {
      type: Boolean,
    },
  },
  components: {
    Project,
  },
  data: () => ({
    categoryRules: [(v) => !!v || 'Description required'],
    editorDialog: false,
    editedCategory: null,
    deleteDialog: false,
    addProjectDialog: false,
    newProjectDescription: null,
  }),
  methods: {
    // category
    categoryUpdate(category) {
      this.$apollo.mutate({
        mutation: M_CATEGORY_UPDATE,
        variables: category,
        update: (store, { data: { categoryUpdate } }) => {
          const data = store.readQuery({
            query: Q_CATEGORY,
          })
          const alteredCategory = data.categories.find(
            (c) => c.id === category.id,
          )
          Object.assign(alteredCategory, categoryUpdate)
          store.writeQuery({
            query: Q_CATEGORY,
            data,
          })
        },
      })
    },
    categoryDelete() {
      const category = this.category
      this.$apollo.mutate({
        mutation: M_CATEGORY_DELETE,
        variables: category,
        update: (store, { data: { categoryDelete } }) => {
          if (categoryDelete) {
            const data = store.readQuery({
              query: Q_CATEGORY,
            })
            data.categories = data.categories.filter((c) => {
              return c.id !== category.id
            })
            store.writeQuery({
              query: Q_CATEGORY,
              data,
            })
          }
        },
      })
    },
    projectCreate() {
      this.addProjectDialog = false
      const newProject = {
        categoryId: this.category.id,
        description: this.newProjectDescription,
      }
      this.$apollo
        .mutate({
          mutation: M_PROJECT_CREATE,
          variables: newProject,
          update: (store, { data: { projectCreate } }) => {
            var data = store.readQuery({
              query: Q_PROJECT,
            })
            data.projects.push(projectCreate)
            store.writeQuery({
              query: Q_PROJECT,
              data,
            })
            // update project nested inside categories
            data = store.readQuery({
              query: Q_CATEGORY,
            })
            data.categories.forEach((category) => {
              if (category.id == projectCreate.category.id) {
                category.projects.push(projectCreate)
              }
            })
            store.writeQuery({
              query: Q_CATEGORY,
              data,
            })
          },
        })
        .catch((error) => {
          this.showErrors(error)
        })
      this.newProjectDescription = null
    },
    // editor
    editorOpen() {
      this.editedCategory = Object.assign({}, this.category)
      this.editorDialog = true
    },
    editorSave() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.editorDialog = false
          this.categoryUpdate(this.editedCategory)
        }
      })
    },
    selectCategory() {
      this.$apollo.mutate({
        mutation: M_SETTINGS_UPDATE,
        variables: {
          categorySelected: this.category.id,
        },
      })
    },
  },
}
</script>
<style>
.selected {
  background: #bbb;
}
</style>