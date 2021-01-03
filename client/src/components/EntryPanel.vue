<template>
  <div>
    <div class="row">
      <div class="col-6 col-md-3 q-pa-md">
        <ch-day-selector
          v-if="settings.dateZoomed"
          v-model="settings.dateZoomed"
        ></ch-day-selector>
        <ch-week-selector v-else v-model="startDate"></ch-week-selector>
      </div>
      <div class="col-6 col-md-3 q-pa-md">
        <q-toggle v-model="hideCompleted" label="Hide Completed"></q-toggle>
      </div>

      <div class="col-6 col-md-3 q-pa-md">
        <q-form ref="form" @submit.prevent>
          <ch-project-picker
            v-model="categorySelected"
            :projects="categories"
            label="Category"
          ></ch-project-picker>
        </q-form>
      </div>
      <div class="col-6 col-md-3 q-pa-md">
        <q-form ref="form" @submit.prevent>
          <ch-project-picker
            v-model="settings.projectSelected"
            :projects="filteredProjects"
            label="Project"
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
          v-for="date in dateSpread(startDate)"
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
import ChWeekSelector from '@/components/WeekSelector.vue'
import ChDaySelector from '@/components/DaySelector.vue'
import ChProjectPicker from '@/components/ProjectPicker'

import {
  Q_ENTRY,
  Q_PROJECT,
  Q_CATEGORY,
  Q_TASK,
  Q_SETTINGS,
} from '@/graphql/queries'

import { M_SETTINGS_UPDATE } from '@/graphql/mutations'

export default {
  name: 'EntryPanel',
  components: {
    ChEntryList,
    ChWeekSelector,
    ChDaySelector,
    ChProjectPicker,
  },
  data: () => ({
    startDate: null,
    hideCompleted: true,
    options: null,
    categorySelected: null,
  }),
  apollo: {
    entries: {
      query: Q_ENTRY,
    },
    projects: {
      query: Q_PROJECT,
    },
    categories: {
      query: Q_CATEGORY,
    },
    tasks: {
      query: Q_TASK,
    },
    settings: {
      query: Q_SETTINGS,
    },
  },
  computed: {
    filteredEntries() {
      var entries_filtered = this.entries || []
      if (this.hideCompleted) {
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
        this.$apollo.mutate({
          mutation: M_SETTINGS_UPDATE,
          variables: settings,
        })
      },
    },
  },
  methods: {
    getEntryList(date) {
      var entries = this.filteredEntries
        .filter((entry) => entry.date == date)
        .sort((a, b) => a['order'] - b['order'])
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