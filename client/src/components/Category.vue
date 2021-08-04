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
            <button-add objectName="Project" @click="addProjectDialog = true" />
          </q-item-section>
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
                  @keydown.enter="createProjectLocal"
                ></q-input>
              </q-form>
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" @click="addProjectDialog = false" />
              <q-btn flat label="Add" @click="createProjectLocal" />
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
            @click="categoryDelete(category)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Project from '@/components/Project.vue'
import ButtonAdd from './ButtonAdd.vue'

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
    ButtonAdd,
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
    createProjectLocal() {
      this.addProjectDialog = false
      const newProject = {
        categoryId: this.category.id,
        description: this.newProjectDescription,
      }
      this.createProject(newProject)
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
  },
}
</script>
<style>
.selected {
  background: #bbb;
}
</style>