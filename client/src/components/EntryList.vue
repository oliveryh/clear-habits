<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col">
        <div v-if="date == 'backlog'" class="float-left">
          <h6 class="font-m-medium" style="margin: auto">BACKLOG</h6>
          <q-icon
            size="4rem"
            name="mdi-archive-outline"
            class="float-left"
            style="border-bottom: 3px solid #027be3; border-radius: 1.5px"
          />
        </div>
        <div v-else-if="isToday(date)" class="float-left">
          <h6 class="font-m-medium" style="margin: auto">
            {{ dateToString(date) }}
          </h6>
          <h2
            style="
              color: white;
              background-color: #027be3;
              border-radius: 10px;
              padding: 2px 5px 2px;
              display: inline-block;
            "
            class="font-m-medium q-my-none float-left"
          >
            {{ date | getDate }}
          </h2>
        </div>
        <div v-else class="float-left">
          <h6 class="font-m-medium" style="margin: auto">
            {{ dateToString(date) }}
          </h6>
          <h2
            style="border-bottom: 3px solid #027be3; border-radius: 1.5px"
            class="font-m-medium q-my-none float-left"
          >
            {{ date | getDate }}
          </h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col col-12 q-py-none">
        <h6 class="font-m-medium q-my-none q-mx-none text-left">
          {{ timeSummary }}
        </h6>
      </div>
      <div class="col col-12" :class="settings.dateZoomed ? 'col-lg-12' : ''">
        <button-add objectName="Task" @click="addTask" class="float-left" />
        <template v-if="!isMobile()">
          <q-btn
            @click="zoomOut()"
            v-if="settings.dateZoomed"
            round
            dense
            flat
            color="primary"
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
            color="primary"
            icon="mdi-magnify-plus-outline"
            class="float-right"
            size="md"
          ></q-btn>
        </template>
      </div>
    </div>
    <q-dialog v-model="editorDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add Task</div>
          <q-form ref="taskForm" class="q-gutter-md" @submit.prevent>
            <q-input
              class="q-pa-sm"
              outlined
              v-model="newEntry.description"
              label="New Entry"
              @keydown.enter="createEntryWithTaskLocal"
            ></q-input>
            <q-input
              class="q-pa-sm"
              outlined
              v-model="newEntryEstimatedTime"
              mask="time"
              :rules="['time']"
              @keydown.enter="createEntryWithTaskLocal"
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="newEntryEstimatedTime" format24h>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="editorDialog = false" />
          <q-btn flat label="Add" @click="createEntryWithTaskLocal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import { M_ENTRY_REORDER } from '@/graphql/mutations'
import { Q_ENTRY, Q_SETTINGS } from '@/graphql/queries'
import ButtonAdd from '@/components/ButtonAdd.vue'

export default {
  name: 'EntryList',
  data: () => ({
    newEntry: {
      description: null,
      timerEstimatedTime: null,
    },
    settings: null,
    editorDialog: false,
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
    ButtonAdd,
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
            listOrder: i,
            date: this.date,
          })
        }

        if (reorderedEntriesOrders.length) {
          this.$apollo.mutate({
            mutation: M_ENTRY_REORDER,
            variables: {
              entryOrders: reorderedEntriesOrders,
            },
            update: (store, { data: { reorderEntries } }) => {
              const variables = this.getWeekDates(store)
              const data = store.readQuery({
                query: Q_ENTRY,
                variables,
              })

              reorderEntries.entries.forEach((entry) => {
                const alteredEntry = data.entries.find((e) => e.id === entry.id)
                Object.assign(alteredEntry, entry)
              })

              store.writeQuery({
                query: Q_ENTRY,
                data,
                variables,
              })
            },
          })
        }
      },
    },
    newEntryEstimatedTime: {
      get() {
        return this.secondsToTimestamp(this.newEntry.timerEstimatedTime, {
          zeroPad: true,
        })
      },
      set(timestamp) {
        this.newEntry.timerEstimatedTime = this.timestampToSeconds(timestamp)
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
        this.secondsToTimestamp(this.totalTrackedTime) +
        ' / ' +
        this.secondsToTimestamp(this.totalEstimatedTime)
      )
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
    // TODO: Validate form before createEntry runs
    createEntryWithTaskLocal() {
      this.editorDialog = false
      var entry = {
        description: this.newEntry.description,
        date: this.date,
      }
      if (this.settings.projectSelected) {
        entry.projectId = this.settings.projectSelected.id
      }
      if (this.newEntry.timerEstimatedTime) {
        entry.timerEstimatedTime = this.newEntry.timerEstimatedTime
      }
      this.createEntryWithTask(entry)
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
    isToday(date) {
      const today = new Date().toISOString().substring(0, 10)
      return date == today
    },
    dateToString(date) {
      const dayIndex = new Date(date).getDay()
      return (
        [
          'SUNDAY',
          'MONDAY',
          'TUESDAY',
          'WEDNESDAY',
          'THURSDAY',
          'FRIDAY',
          'SATURDAY',
        ][dayIndex] || ''
      )
    },
    addTask() {
      this.editorDialog = true
    },
  },
}
</script>

<style scoped>
.col {
  padding: 5px 0px;
}
</style>