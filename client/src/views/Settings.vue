<template>
  <div>
    <div class="row">
      <div class="col-6 q-pa-md">
        <div class="row">
          <h5 class="text-weight-light q-my-none q-pb-md">Categories</h5>
        </div>
        <div class="row">
          <div v-for="category in categories" :key="category._id" class="col col-12">
            <Category
              :key="category._id"
              :category="category"
              :selected="categorySelected == category._id"
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
          <div v-for="project in selectedProjects" :key="project._id" class="col col-12">
            <Project :key="project._id" :project="project" />
          </div>
          <div class="col col-12">
            <q-input filled v-model="newProject" label="Add Project" @keydown.enter="projectCreate"></q-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Category from '@/components/Category.vue'
import Project from '@/components/Project.vue'
import {
  A_PROJECT_CREATE,
  A_PROJECT_RETRIEVE,
  A_CATEGORY_CREATE,
  A_CATEGORY_RETRIEVE,
} from '@/store/actions.type'

export default {
  name: 'Settings',
  mounted() {
    this.categoriesRetrieve()
    this.projectsRetrieve()
  },
  data() {
    return {
      startDate: null,
      editedCategory: null,
      newProject: null,
      newCategory: null,
    }
  },
  components: {
    Category,
    Project,
  },
  computed: {
    ...mapState({
      categories: (state) => state.settings.categories,
      projects: (state) => state.settings.projects,
      categorySelected: (state) => state.settings.categorySelected,
      errors: (state) => state.auth.errors,
    }),
    selectedProjects() {
      return this.projects.filter((project) =>
        project.category != null
          ? project.category._id == this.categorySelected
          : false,
      )
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
    categoriesRetrieve() {
      this.$store.dispatch(A_CATEGORY_RETRIEVE)
    },
    projectsRetrieve() {
      this.$store.dispatch(A_PROJECT_RETRIEVE)
    },
    categoryCreate() {
      var category = {
        description: this.newCategory,
        color: '#111',
      }
      this.$store.dispatch(A_CATEGORY_CREATE, category)
      this.newCategory = null
    },
    projectCreate() {
      var project = {
        category: this.categorySelected,
        description: this.newProject,
      }
      this.$store.dispatch(A_PROJECT_CREATE, project)
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