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
          @click="categoryDelete(category)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'CategoryDeleteModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    category: {
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

<style></style>
