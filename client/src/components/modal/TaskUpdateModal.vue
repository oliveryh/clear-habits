<template>
  <q-dialog v-model="showModal">
    <q-card v-if="editedTask">
      <q-card-section>
        <div class="text-h6">Edit Task</div>
        <q-form ref="entryForm" class="q-gutter-md" @submit.prevent>
          <q-input
            v-model="editedTask.description"
            outlined
            label="Description"
          ></q-input>
        </q-form>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn
          flat
          label="Cancel"
          @click="
            () => {
              editedTask = {}
              showModal = false
            }
          "
        />
        <q-btn
          flat
          label="Save"
          @click="
            () => {
              updateTask(editedTask)
              this.showModal = false
            }
          "
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'TaskUpdateModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  watch: {
    show(value) {
      if (value) {
        this.editedTask = Object.assign({}, this.task)
      }
    },
  },
  data: () => ({
    editedTask: null,
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
}
</script>

<style></style>
