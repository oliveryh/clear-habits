<template>
  <div>
    <ch-task-panel />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ChTaskPanel from '@/components/TaskPanel.vue'

export default {
  name: 'Home',
  components: {
    ChTaskPanel,
  },
  data: () => ({
    snackbar: false,
  }),
  computed: {
    ...mapState({
      errors: (state) => state.auth.errors,
    }),
  },
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