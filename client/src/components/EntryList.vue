<template>
  <div class="q-pa-sm">
    <div class="row">
      <div class="col">
        <div v-if="date == 'backlog'" class="float-left">
          <div v-if="isMobile()">
            <q-icon
              size="1.5rem"
              name="mdi-archive-outline"
              class="float-left"
              style="
                border-bottom: 3px solid #218896;
                border-radius: 1.5px;
                margin-right: 8px;
              "
            />
            <h6 class="font-m-medium float-left" style="margin: auto">
              BACKLOG
            </h6>
          </div>
          <div v-else>
            <div class="row q-pb-m">
              <h5 class="font-m-medium float-left q-my-none">.</h5>
            </div>
            <h6 class="font-m-medium" style="margin: auto">BACKLOG</h6>
            <q-icon
              size="4rem"
              name="mdi-archive-outline"
              class="float-left"
              style="border-bottom: 3px solid #218896; border-radius: 1.5px"
            />
          </div>
        </div>
        <div v-else-if="isToday(date)" class="float-left">
          <div v-if="isMobile()">
            <h5
              style="
                color: white;
                background-color: #218896;
                border-radius: 10px;
                padding: 2px 5px 2px;
                display: inline-block;
                margin-right: 8px;
              "
              class="font-m-medium q-my-none float-left"
            >
              {{ date | getDate }}
            </h5>
            <h6 class="font-m-medium float-left" style="margin: auto">
              {{ dateToString(date) }}
            </h6>
          </div>
          <div v-else>
            <div class="row q-pb-m">
              <h5 class="font-m-medium float-left q-my-none">
                {{ displayMonth(date) ? monthName(date).toUpperCase() : '.' }}
              </h5>
            </div>
            <h6 class="font-m-medium" style="margin: auto">
              {{ dateToString(date) }}
            </h6>
            <h2
              style="
                color: white;
                background-color: #218896;
                border-radius: 10px;
                padding: 2px 5px 2px;
                display: inline-block;
              "
              class="font-m-medium q-my-none float-left"
            >
              {{ date | getDate }}
            </h2>
          </div>
        </div>
        <div v-else class="float-left">
          <div v-if="isMobile()">
            <h5
              style="
                border-bottom: 3px solid #218896;
                border-radius: 1.5px;
                margin-right: 8px;
              "
              class="font-m-medium q-my-none float-left"
            >
              {{ date | getDate }}
            </h5>
            <h6 class="font-m-medium float-left" style="margin: auto">
              {{ dateToString(date) }}
            </h6>
          </div>
          <div v-else>
            <div class="row q-pb-m">
              <h5 class="font-m-medium float-left q-my-none">
                {{ displayMonth(date) ? monthName(date).toUpperCase() : '.' }}
              </h5>
            </div>
            <h6 class="font-m-medium" style="text-align: left; margin: auto">
              {{ dateToString(date) }}
            </h6>
            <h2
              style="border-bottom: 3px solid #218896; border-radius: 1.5px"
              class="font-m-medium q-my-none float-left"
            >
              {{ date | getDate }}
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col col-12 q-py-none">
        <h6 class="font-m-medium q-my-none q-mx-none text-left float-left">
          {{ timeSummary }}
        </h6>
        <button-add
          v-if="isMobile()"
          objectName="Task"
          compact
          compactIcon="mdi-sticker-plus-outline"
          @click="addTask"
          class="float-right"
        />
      </div>
      <div
        v-if="!isMobile()"
        class="col col-12"
        :class="settings.dateZoomed ? 'col-lg-12' : ''"
      >
        <button-add objectName="Task" @click="addTask" class="float-left" />
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
      </div>
    </div>
    <ch-task-create-with-entry-modal
      :show="addTaskWithEntryDialog"
      :date="date"
      @hide="
        () => {
          addTaskWithEntryDialog = false
        }
      "
    />
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
import utils from '@/common/utils.js'
import ButtonAdd from '@/components/ButtonAdd.vue'
import Entry from '@/components/Entry.vue'
import ChTaskCreateWithEntryModal from '@/components/modal/TaskCreateWithEntryModal.vue'
import { M_ENTRY_REORDER } from '@/graphql/mutations'
import { Q_ENTRY, Q_SETTINGS } from '@/graphql/queries'
import draggable from 'vuedraggable'

export default {
  name: 'EntryList',
  data: () => ({
    settings: null,
    addTaskWithEntryDialog: false,
  }),
  props: {
    date: {
      type: String,
    },
    entries: {
      type: Array,
    },
    isFirst: {
      type: Boolean,
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
    ChTaskCreateWithEntryModal,
  },
  computed: {
    filteredEntries: {
      get() {
        return this.entries
      },
      set(reorderedEntries) {
        // Eagerly set the expected change to prop
        this.entries = reorderedEntries

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
      this.addTaskWithEntryDialog = true
    },
    displayMonth(date) {
      return this.isFirst || date.substring(8, 10) == '01'
    },
    monthName: utils.monthName,
  },
}
</script>

<style scoped>
.col {
  padding: 5px 0px;
}
</style>
