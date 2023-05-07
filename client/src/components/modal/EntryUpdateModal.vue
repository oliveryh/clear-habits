<template>
  <q-dialog v-if="editedEntry != null" v-model="showModal">
    <q-card>
      <q-card-section v-if="editTask">
        <div class="text-h6">Edit Task</div>
        <q-form ref="taskForm" class="q-gutter-md" @submit.prevent>
          <ch-picker
            v-model="editedEntry.task.project"
            :options="projects"
            label="Project"
            :showAvatar="false"
          ></ch-picker>
          <q-input
            v-model="editedEntry.task.description"
            outlined
            label="Description"
          ></q-input>
        </q-form>
        <q-btn
          class="q-mt-md"
          outlined
          icon="mdi-sticker-plus-outline"
          label="Copy Task"
          @click="copyTaskWithEntry"
          v-close-popup
        />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="showModal = false" />
          <q-btn flat label="Save" @click="saveTask()" />
        </q-card-actions>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Edit Entry</div>
        <q-form ref="entryForm" class="q-gutter-md" @submit.prevent>
          <q-input
            v-model="editedEntry.description"
            outlined
            label="Description"
          ></q-input>
          <q-input
            v-model="editedEntry.date"
            mask="####-##-##"
            outlined
            label="Date"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="editedEntry.date"
                    mask="YYYY-MM-DD"
                    first-day-of-week="1"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <ch-time-picker v-model="editedEntry.timerEstimatedTime" />
          <ch-time-picker v-model="editedEntry.timerTrackedTime" />
          <q-btn
            outlined
            icon="mdi-plus-circle-multiple-outline"
            label="Add Entry"
            @click="addEntryToTask"
          />
          <q-btn
            outlined
            icon="mdi-delete"
            label="Delete"
            @click="modal.entryDelete = true"
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn
          flat
          label="Cancel"
          @click="
            showModal = false
            timerSet()
          "
        />
        <q-btn flat label="Save" @click="saveEntry()" />
      </q-card-actions>
    </q-card>
    <ch-entry-delete-modal
      :entry="entry"
      :show="modal.entryDelete"
      @hide="modal.entryDelete = false"
    />
  </q-dialog>
</template>

<script>
import ChEntryDeleteModal from '@/components/modal/EntryDeleteModal.vue'
import ChPicker from '@/components/Picker'
import ChTimePicker from '@/components/TimePicker'

import { Q_PROJECT } from '@/graphql/queries'

export default {
  name: 'EntryUpdateModal',
  components: {
    ChEntryDeleteModal,
    ChPicker,
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
    editTask: {
      type: Boolean,
      default: true,
    },
  },
  apollo: {
    projects: {
      query: Q_PROJECT,
    },
  },
  watch: {
    show(value) {
      if (value) {
        this.editedEntry = Object.assign({}, this.entry)
      }
    },
  },
  data: () => ({
    editedEntry: null,

    modal: {
      entryDelete: false,
    },
  }),
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
    saveEntry() {
      this.$refs.entryForm.validate().then((success) => {
        if (success) {
          this.showModal = false
          this.updateEntry(this.editedEntry)
        }
      })
    },
    saveTask() {
      // Add mandatory project to validation
      this.$refs.taskForm.validate().then((success) => {
        if (success) {
          this.showModal = false
          const task = this.editedEntry.task
          this.updateTask({
            id: task.id,
            projectId: task.project.id,
            description: task.description,
          })
        }
      })
    },
    addEntryToTask() {
      this.showModal = false
      var entry = {
        description: this.entry.description,
        date: this.entry.date,
        taskId: this.entry.task.id,
        timerEstimatedTime: this.entry.timerEstimatedTime,
      }
      this.createEntryPaginated(entry)
    },
    copyTaskWithEntry() {
      var entryWithTask = {
        description: this.entry.task.description,
        projectId: this.entry.task.project.id,
        date: this.entry.date,
        timerEstimatedTime: this.entry.timerEstimatedTime,
      }
      this.createEntryWithTask(entryWithTask)
    },
  },
}
</script>

<style></style>
