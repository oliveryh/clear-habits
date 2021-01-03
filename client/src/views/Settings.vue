<template>
  <div>
    <div class="row">
      <div class="col-6 q-pa-md">
        <div class="row">
          <h5 class="text-weight-light q-my-none q-pb-md">Categories</h5>
        </div>
        <div class="row">
          <div
            v-for="category in categories"
            :key="category.id"
            class="col col-12"
          >
            <Category
              :key="category.id"
              :category="category"
              :selected="categorySelected == category.id"
            />
          </div>
          <div class="col col-12">
            <q-input
              filled
              v-model="newCategory"
              label="Add Category"
              @keydown.enter="categoryCreate"
            ></q-input>
          </div>
        </div>
      </div>
      <div class="col-6 q-pa-md">
        <div class="row">
          <h5 class="text-weight-light q-my-none q-pb-md">Projects</h5>
        </div>
        <div class="row">
          <div
            v-for="project in selectedProjects"
            :key="project.id"
            class="col col-12"
          >
            <Project :key="project.id" :project="project" />
          </div>
          <div class="col col-12">
            <q-input
              filled
              v-model="newProject"
              label="Add Project"
              @keydown.enter="projectCreate"
            ></q-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Category from '@/components/Category.vue'
import Project from '@/components/Project.vue'
import { M_CATEGORY_CREATE, M_PROJECT_CREATE } from '@/graphql/mutations'
import { Q_PROJECT, Q_CATEGORY, Q_SETTINGS } from '@/graphql/queries'

export default {
  name: 'Settings',
  data() {
    return {
      startDate: null,
      editedCategory: null,
      newProject: null,
      newCategory: null,
      categorySelected: null,
    }
  },
  apollo: {
    projects: {
      query: Q_PROJECT,
    },
    categories: {
      query: Q_CATEGORY,
    },
    settings: {
      query: Q_SETTINGS,
      update(data) {
        this.categorySelected = data.settings.categorySelected
      },
    },
  },
  components: {
    Category,
    Project,
  },
  computed: {
    selectedProjects() {
      if (this.projects) {
        return this.projects.filter((project) =>
          project.category != null
            ? project.category.id == this.categorySelected
            : false,
        )
      } else {
        return []
      }
    },
  },
  watch: {
    errors() {
      if (Object.keys(this.errors).length) {
        this.showErrors()
      }
    },
  },
  methods: {
    showErrors() {
      Object.keys(this.errors).map((key) =>
        this.$q.notify({
          group: false,
          message: key + ' ' + this.errors[key],
          type: 'negative',
        }),
      )
    },
    categoryCreate() {
      var category = {
        description: this.newCategory,
        color: '#111',
      }
      this.$apollo
        .mutate({
          mutation: M_CATEGORY_CREATE,
          variables: category,
          update: (store, { data: { categoryCreate } }) => {
            const data = store.readQuery({
              query: Q_CATEGORY,
            })
            data.categories.push(categoryCreate)
            store.writeQuery({
              query: Q_CATEGORY,
              data,
            })
          },
        })
        .catch((error) => {
          this.showErrors(error)
        })
      this.newCategory = null
    },
    projectCreate() {
      var project = {
        categoryId: this.categorySelected,
        description: this.newProject,
      }
      this.$apollo
        .mutate({
          mutation: M_PROJECT_CREATE,
          variables: project,
          update: (store, { data: { projectCreate } }) => {
            const data = store.readQuery({
              query: Q_PROJECT,
            })
            data.projects.push(projectCreate)
            store.writeQuery({
              query: Q_PROJECT,
              data,
            })
          },
        })
        .catch((error) => {
          this.showErrors(error)
        })
      this.newProject = null
    },
  },
}
</script>
<style scoped>
.col {
  padding: 5px 0px;
}
</style>