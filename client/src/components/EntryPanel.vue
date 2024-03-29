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
          <ch-picker
            v-model="categorySelected"
            :options="categories"
            label="Category"
            :showAvatar="true"
          ></ch-picker>
        </q-form>
      </div>
      <div class="col-6 col-md-3" style="padding: 10px 10px 5px 10px">
        <q-form ref="form" @submit.prevent>
          <ch-picker
            v-model="settings.projectSelected"
            :options="filteredProjects"
            label="Project"
            :showAvatar="false"
          ></ch-picker>
        </q-form>
      </div>
    </div>
    <div class="row" style="text-align: center">
      <div v-if="settings.dateZoomed" class="col col-12">
        <ch-entry-list
          :date="settings.dateZoomed"
          :entries="getEntryList(settings.dateZoomed)"
        />
      </div>
      <div v-if="settings.dateZoomed" class="col col-12">
        <ch-entry-list date="backlog" :entries="getEntryList('backlog')" />
      </div>
      <template v-else>
        <div class="custom8cols">
          <ch-entry-list date="backlog" :entries="getEntryList('backlog')" />
        </div>
        <div
          v-for="(date, index) in dateSpread(this.settings.startDate)"
          :key="date"
          class="custom8cols"
        >
          <ch-entry-list
            :date="date"
            :entries="getEntryList(date)"
            :isFirst="index == 0"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ChEntryList from '@/components/EntryList.vue'
import ChDateSelector from '@/components/DateSelector.vue'
import ChPicker from '@/components/Picker'

import { Q_ENTRY, Q_PROJECT, Q_CATEGORY, Q_SETTINGS } from '@/graphql/queries'

export default {
  name: 'EntryPanel',
  components: {
    ChEntryList,
    ChDateSelector,
    ChPicker,
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
        let settings = this.settings
        let monday
        if (settings.dateZoomed) {
          monday = this.mondayOfWeek(new Date(settings.dateZoomed))
        } else {
          monday = settings.startDate
        }
        return {
          datesIn: this.dateSpread(monday).concat(['backlog']),
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
    entries: {
      deep: true,
      handler(entries) {
        const favicon = document.getElementById('favicon')
        console.log(favicon)
        if (entries.some((entry) => entry.timerActive)) {
          const newLink = favicon.href.replace(
            'favicon.png',
            'favicon-recording.png',
          )
          favicon.href = newLink
        } else {
          const newLink = favicon.href.replace(
            'favicon-recording.png',
            'favicon.png',
          )
          favicon.href = newLink
        }
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
