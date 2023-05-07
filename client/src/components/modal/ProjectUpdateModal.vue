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
          @click="model.projectDelete = true"
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
      :show="model.projectDelete"
      @hide="model.projectDelete = false"
    />
  </q-dialog>
</template>

<script>
import ChProjectDeleteModal from '@/components/modal/ProjectDeleteModal.vue'

export default {
  name: 'ProjectUpdateModal',
  components: {
    ChProjectDeleteModal,
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
