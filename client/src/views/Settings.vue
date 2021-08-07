<template>
  <div>
    <div class="row">
      <div class="col">
        <ch-settings-panel class="q-px-md q-pt-lg" :categories="categories" />
      </div>
    </div>
  </div>
</template>
<script>
import SettingsPanel from '@/components/SettingsPanel.vue'
import { Q_PROJECT, Q_CATEGORY, Q_SETTINGS } from '@/graphql/queries'

export default {
  name: 'Settings',
  data() {
    return {
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
    ChSettingsPanel: SettingsPanel,
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
}
</script>
<style scoped>
.col {
  padding: 5px 0px;
}
</style>