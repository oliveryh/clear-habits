<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col">
        <h5 class="text-weight-light q-my-none float-left">
          {{ date == 'backlog' ? 'Backlog' : date }}
        </h5>
        <q-btn
          @click="zoomOut()"
          v-if="settings.dateZoomed"
          round
          dense
          flat
          icon="mdi-magnify-minus-outline"
          class="float-right"
          size="md"
        ></q-btn>
        <q-btn
          @click="zoomIn()"
          v-else
          round
          dense
          flat
          icon="mdi-magnify-plus-outline"
          class="float-right"
          size="md"
        ></q-btn>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h5 class="text-weight-light q-my-none">{{ timeSummary }}</h5>
      </div>
    </div>
    <div class="row">
      <div class="col col-12" :class="settings.dateZoomed ? 'col-lg-8' : ''">
        <q-input
          class="q-pa-sm"
          outlined
          v-model="newEntry.description"
          label="New Entry"
          @keydown.enter="entryCreate"
        ></q-input>
      </div>
      <div class="col col-12" :class="settings.dateZoomed ? 'col-lg-4' : ''">
        <q-input
          class="q-pa-sm"
          outlined
          v-model="newEntryEstimatedTime"
          mask="time"
          :rules="['time']"
          @keydown.enter="entryCreate"
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="newEntryEstimatedTime" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <draggable
      :emptyInsertThreshold="75"
      v-model="filteredEntries"
      group="entries"
      class="row"
    >
      <div class="col col-12" :key="entry._id" v-for="entry in filteredEntries">
        <Entry :key="entry._id" :entry="entry" />
      </div>
    </draggable>
  </div>
</template>
<script>
import Entry from '@/components/Entry.vue'
import draggable from 'vuedraggable'
import {
  M_ENTRY_CREATE_WITH_TASK,
  M_ENTRY_REORDER,
  M_SETTINGS_UPDATE,
} from '@/graphql/mutations'
import { Q_ENTRY, Q_SETTINGS } from '@/graphql/queries'

export default {
  name: 'EntryList',
  data: () => ({
    newEntry: {
      description: null,
      timerEstimatedTime: null,
    },
    settings: null,
  }),
  props: {
    date: {
      type: String,
    },
    entries: {
      type: Array,
    },
  },
  apollo: {
    settings: {
      query: Q_SETTINGS,
    },
  },
  components: {
    Entry,
    draggable,
  },
  computed: {
    filteredEntries: {
      get() {
        return this.entries
      },
      set(reorderedEntries) {
        var reorderedEntriesOrders = []

        for (let i = 0; i < reorderedEntries.length; i++) {
          reorderedEntriesOrders.push({
            id: reorderedEntries[i].id,
            order: i,
          })
        }

        this.$apollo.mutate({
          mutation: M_ENTRY_REORDER,
          variables: {
            date: this.date,
            entries: reorderedEntriesOrders,
          },
          update: (store, { data: { entryReorder } }) => {
            const data = store.readQuery({
              query: Q_ENTRY,
            })

            entryReorder.forEach((entry) => {
              const alteredEntry = data.entries.find((e) => e.id === entry.id)
              Object.assign(alteredEntry, entry)
            })

            store.writeQuery({
              query: Q_ENTRY,
              data,
            })
          },
        })
      },
    },
    newEntryEstimatedTime: {
      get() {
        return this.minutesToTimestamp(this.newEntry.timerEstimatedTime)
      },
      set(val) {
        this.newEntry.timerEstimatedTime = this.timestampToMinutes(val)
      },
    },
    totalEstimatedTime() {
      var sum = 0
      this.filteredEntries.filter((entry) => (sum += entry.timerEstimatedTime))
      return sum
    },
    totalTrackedTime() {
      var sum = 0
      this.filteredEntries.filter((entry) => (sum += entry.timerTrackedTime))
      return sum
    },
    timeSummary() {
      return (
        this.secondsToTimestamp(this.totalTrackedTime).slice(0, -3) +
        ' / ' +
        this.secondsToTimestamp(this.totalEstimatedTime).slice(0, -3)
      )
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
    // TODO: Validate form before entryCreate runs
    entryCreate() {
      var entry = {
        description: this.newEntry.description,
        date: this.date,
        timerEstimatedTime: this.newEntry.timerEstimatedTime,
      }
      if (this.settings.projectSelected) {
        entry.projectId = this.settings.projectSelected.id
      }
      this.$apollo
        .mutate({
          mutation: M_ENTRY_CREATE_WITH_TASK,
          variables: entry,
          update: (store, { data: { entryCreateWithTask } }) => {
            const data = store.readQuery({
              query: Q_ENTRY,
            })
            data.entries.push(entryCreateWithTask)
            store.writeQuery({
              query: Q_ENTRY,
              data,
            })
          },
        })
        .catch((error) => {
          this.showErrors(error)
        })
      this.newEntry = {
        description: null,
        timerEstimatedTime: null,
      }
    },
    zoomOut() {
      this.settings.dateZoomed = null
    },
    zoomIn() {
      this.settings.dateZoomed = this.date
    },
  },
}
</script>

<style scoped>
.col {
  padding: 5px 0px;
}
</style>