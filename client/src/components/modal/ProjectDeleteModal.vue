<template>
  <q-dialog v-model="showModal" v-close-popup>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Are you sure you'd like to delete this?</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Delete"
          color="warning"
          @click="deleteProject(project)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ProjectDeleteModal',
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
