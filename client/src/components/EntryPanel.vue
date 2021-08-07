<template>
  <div>
    <div class="row">
      <div class="col-6 col-md-3" style="padding: 10px 10px 5px 10px">
        <ch-date-selector
          v-if="settings.dateZoomed"
          v-model="settings.dateZoomed"
          period="day"
        ></ch-date-selector>
        <ch-date-selector
          v-else
          v-model="settings.startDate"
          period="week"
        ></ch-date-selector>
      </div>
      <div class="col-6 col-md-3" style="padding: 10px 10px 5px 10px">
        <q-toggle icon="mdi-check" v-model="showCompleted"
          ><div class="text-caption font-m-bold">SHOW COMPLETE</div></q-toggle
        >
      </div>

      <div class="col-6 col-md-3" style="padding: 10px 10px 5px 10px">
        <q-form ref="form" @submit.prevent>
          <ch-project-picker
            v-model="categorySelected"
            :projects="categories"
            label="Category"
            :showAvatar="true"
          ></ch-project-picker>
        </q-form>
      </div>
      <div class="col-6 col-md-3" style="padding: 10px 10px 5px 10px">
        <q-form ref="form" @submit.prevent>
          <ch-project-picker
            v-model="settings.projectSelected"
            :projects="filteredProjects"
            label="Project"
            :showAvatar="false"
          ></ch-project-picker>
        </q-form>
      </div>
    </div>
    <div class="row" style="text-align: center">
      <div v-if="settings.dateZoomed" class="col">
        <ch-entry-list
          :date="settings.dateZoomed"
          :entries="getEntryList(settings.dateZoomed)"
        />
      </div>
      <template v-else>
        <div class="custom8cols">
          <ch-entry-list date="backlog" :entries="getEntryList('backlog')" />
        </div>
        <div
          v-for="date in dateSpread(this.settings.startDate)"
          :key="date"
          class="custom8cols"
        >
          <ch-entry-list :date="date" :entries="getEntryList(date)" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ChEntryList from '@/components/EntryList.vue'
import ChDateSelector from '@/components/DateSelector.vue'
import ChProjectPicker from '@/components/ProjectPicker'

import { Q_ENTRY, Q_PROJECT, Q_CATEGORY, Q_SETTINGS } from '@/graphql/queries'

export default {
  name: 'EntryPanel',
  components: {
    ChEntryList,
    ChDateSelector,
    ChProjectPicker,
  },
  data: () => ({
    showCompleted: false,
    options: null,
    categorySelected: null,
  }),
  apollo: {
    entries: {
      query: Q_ENTRY,
      variables() {
        return {
          datesIn: this.dateSpread(this.settings.startDate).concat(['backlog']),
        }
      },
    },
    projects: {
      query: Q_PROJECT,
    },
    categories: {
      query: Q_CATEGORY,
    },
    settings: {
      query: Q_SETTINGS,
    },
  },
  computed: {
    filteredEntries() {
      var entries_filtered = this.entries || []
      if (!this.showCompleted) {
        entries_filtered = entries_filtered.filter(
          (entry) => entry.complete == false,
        )
      }
      if (this.categorySelected) {
        entries_filtered = entries_filtered.filter((entry) =>
          entry.task.project != null
            ? entry.task.project.category.id == this.categorySelected.id
            : false,
        )
      }
      if (this.settings.projectSelected) {
        entries_filtered = entries_filtered.filter((entry) =>
          entry.task.project != null
            ? entry.task.project.id == this.settings.projectSelected.id
            : false,
        )
      }
      return entries_filtered
    },
    filteredProjects() {
      var projects_filtered = this.projects
      if (this.categorySelected) {
        projects_filtered = projects_filtered.filter(
          (project) => project.category.id == this.categorySelected.id,
        )
      }
      return projects_filtered
    },
    completedEntries() {
      return this.entries.filter((entry) => entry.complete).length
    },
    remainingEntries() {
      return this.entries.length - this.completedEntries
    },
  },
  watch: {
    settings: {
      deep: true,
      handler(settings) {
        this.settingsUpdate(settings)
      },
    },
  },
  methods: {
    getEntryList(date) {
      var entries = this.filteredEntries
        .filter((entry) => entry.date == date)
        .sort((a, b) => a['listOrder'] - b['listOrder'])
      return entries
    },
  },
}
</script>

<style scoped>
.custom8cols {
  width: 12.5%;
  max-width: 12.5%;
  flex-basis: 12.5%;
}
.align-center {
  display: flex;
  align-items: center;
}
</style>