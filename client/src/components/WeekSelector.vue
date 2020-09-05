<template>
  <div>
    <q-btn-group>
      <q-btn icon="mdi-calendar">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date
            v-model="monday"
            first-day-of-week="1"
            @input="() => $refs.qDateProxy.hide()"
            mask="YYYY-MM-DD"
          />
        </q-popup-proxy>
      </q-btn>
      <q-btn icon="mdi-arrow-left" @click="deltaWeek(-1)" />
      <q-btn label="This Week" @click="mondayThisWeek()" />
      <q-btn icon="mdi-arrow-right" @click="deltaWeek(1)" />
    </q-btn-group>
  </div>
</template>

<script>
export default {
  name: 'WeekSelector',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.mondayThisWeek()
  },
  computed: {
    monday: {
      get() {
        return this.value
      },
      set(value) {
        this.mondayOfWeek(new Date(value))
      },
    },
  },
  methods: {
    setValue(value) {
      var dateISO = value.toISOString().split('T')[0]
      this.$emit('input', dateISO)
    },
    deltaWeek(delta) {
      var newDate = new Date(this.value)
      newDate.setDate(newDate.getDate() + delta * 7)
      this.setValue(newDate)
    },
    mondayOfWeek(date) {
      var newDate = date
      const dayOffset = newDate.getDay()
      newDate.setDate(newDate.getDate() - ((dayOffset + 6) % 7))
      const tzOffset = newDate.getTimezoneOffset()
      newDate = new Date(newDate.getTime() - tzOffset * 60 * 1000)
      this.setValue(newDate)
    },
    mondayThisWeek() {
      var today = new Date()
      this.mondayOfWeek(today)
    },
  },
}
</script>