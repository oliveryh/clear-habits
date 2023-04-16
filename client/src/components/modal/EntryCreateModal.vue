<template>
  <q-dialog v-model="showModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Add Entry</div>
        <q-form ref="entryForm" class="q-gutter-md" @submit.prevent>
          <q-input
            class="q-pa-sm"
            outlined
            v-model="newEntry.description"
            label="New Entry"
            @keydown.enter="createEntryLocal"
          ></q-input>
          <q-input
            class="q-pa-sm"
            outlined
            v-model="newEntryEstimatedTime"
            mask="time"
            :rules="['time']"
            fill-mask
            debounce="300"
            @keydown.enter="createEntryLocal"
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
        <q-btn flat label="Add" @click="createEntryLocal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'EntryCreateModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    entry: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    newProjectDescription: null,
    newEntry: null,
  }),
  watch: {
    show(value) {
      if (value) {
        this.newEntry = Object.assign({}, this.entry)
      }
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
      set(val) {
        this.newEntry.timerEstimatedTime = this.timestampToSeconds(val)
      },
    },
  },
  methods: {
    createEntryLocal() {
      this.showModal = false
      var entry = this.newEntry
      if (this.newEntry.timerEstimatedTime) {
        entry.timerEstimatedTime = this.newEntry.timerEstimatedTime
      }
      this.createEntry(entry)
      this.newEntry = {
        description: null,
        date: 'backlog',
        timerEstimatedTime: null,
      }
    },
  },
}
</script>

<style></style>
