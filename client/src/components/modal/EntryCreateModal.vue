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
          <ch-time-picker v-model="newEntry.timerEstimatedTime" />
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
import ChTimePicker from '@/components/TimePicker.vue'
export default {
  name: 'EntryCreateModal',
  components: {
    ChTimePicker,
  },
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
