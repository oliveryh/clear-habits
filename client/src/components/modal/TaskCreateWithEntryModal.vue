<template>
  <q-dialog v-model="showModal" v-close-popup>
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
            fill-mask
            debounce="300"
            @keydown.enter="createEntryWithTaskLocal"
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
        </q-form>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="showModal = false" />
        <q-btn flat label="Add" @click="createEntryWithTaskLocal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { Q_SETTINGS } from '@/graphql/queries'

export default {
  name: 'TaskCreateWithEntryModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    newEntry: {
      description: null,
      timerEstimatedTime: null,
    },
  }),
  apollo: {
    settings: {
      query: Q_SETTINGS,
    },
  },
  computed: {
    showModal: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit('hide', value)
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
  },
  methods: {
    createEntryWithTaskLocal() {
      this.showModal = false
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
      console.log(entry)
      this.createEntryWithTask(entry)
      this.newEntry = {
        description: null,
        timerEstimatedTime: null,
      }
    },
  },
}
</script>
