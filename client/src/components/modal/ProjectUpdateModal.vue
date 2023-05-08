<template>
  <q-dialog v-model="showModal" v-close-popup>
    <q-card>
      <q-card-section>
        <div class="text-h6">Edit Project</div>
        <q-form ref="form" @submit.prevent>
          <q-input
            v-model="project.description"
            :rules="rules.projectDescription"
          ></q-input>
        </q-form>
        <q-btn
          outline
          icon="mdi-delete"
          label="Delete"
          @click="modal.projectDelete = true"
        />
        <q-input
          v-model.number="project.targetDays"
          type="number"
          icon="mdi-bullseye-arrow"
          min="1"
          :rules="rules.projectTargetDays"
          label="Target Days"
          clearable
        />
        <ch-time-picker
          nullable
          v-model="project.targetMinTimePerWeek"
          label="Target Min Time Per Week"
        />
        <ch-time-picker
          nullable
          v-model="project.targetMaxTimePerWeek"
          label="Target Max Time Per Week"
        />
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
        <q-btn flat label="Save" @click="editorSave()" />
      </q-card-actions>
    </q-card>
    <ch-project-delete-modal
      :project="project"
      :show="modal.projectDelete"
      @hide="modal.projectDelete = false"
    />
  </q-dialog>
</template>

<script>
import ChTimePicker from '@/components/TimePicker'
import ChProjectDeleteModal from '@/components/modal/ProjectDeleteModal.vue'

export default {
  name: 'ProjectUpdateModal',
  components: {
    ChProjectDeleteModal,
    ChTimePicker,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    project: {
      type: Object,
      required: true,
    },
  },
  watch: {
    show(value) {
      if (value) {
        this.editedProject = Object.assign({}, this.project)
      }
    },
  },
  data: () => ({
    editedProject: null,
    rules: {
      projectDescription: [(v) => !!v || 'Description required'],
      projectTargetDays: [(v) => /^\d*$/.test(v) || 'Must be an integer'],
    },
    modal: {
      projectDelete: false,
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
    editorSave() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.showModal = false
          this.updateProject(this.project)
        }
      })
    },
  },
}
</script>

<style></style>
