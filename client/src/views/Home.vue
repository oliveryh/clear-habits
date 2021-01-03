<template>
  <div>
    <ch-entry-panel />
  </div>
</template>
<script>
import ChEntryPanel from '@/components/EntryPanel.vue'

export default {
  name: 'Home',
  components: {
    ChEntryPanel,
  },
  data: () => ({
    snackbar: false,
  }),
  watch: {
    errors() {
      if (Object.keys(this.errors).length) {
        this.showErrors()
      }
    },
  },
  methods: {
    showErrors() {
      Object.keys(this.errors).map((key) =>
        this.$q.notify({
          group: false,
          message: key + ' ' + this.errors[key],
          type: 'negative',
        }),
      )
    },
  },
}
</script>