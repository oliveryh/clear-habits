<template>
  <div>
    <ch-task-panel />
    <v-snackbar v-model="snackbar" color="error" v-if="errors">
      <p style="margin: 0;" v-for="(v, k) in errors" :key="k">{{ k }} {{ v }}</p>
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
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
      errors: state => state.auth.errors,
    }),
  },
  watch: {
    errors() {
      if (Object.keys(this.errors).length) {
        this.snackbar = true
      }
    },
  },
}
</script>