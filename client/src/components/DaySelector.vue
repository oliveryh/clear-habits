<template>
  <div>
    <q-btn-group>
      <q-btn icon="mdi-calendar">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date
            v-model="calendarDate"
            first-day-of-week="1"
            @input="() => $refs.qDateProxy.hide()"
            mask="YYYY-MM-DD"
          />
        </q-popup-proxy>
      </q-btn>
      <q-btn icon="mdi-arrow-left" @click="deltaWeek(-1)" />
      <q-btn label="Today" @click="today()" />
      <q-btn icon="mdi-arrow-right" @click="deltaWeek(1)" />
    </q-btn-group>
  </div>
</template>

<script>
export default {
  name: 'DaySelector',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    calendarDate: {
      get() {
        return this.value
      },
      set(value) {
        this.setValue(new Date(value))
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
      newDate.setDate(newDate.getDate() + delta)
      this.setValue(newDate)
    },
    today() {
      var today = new Date()
      this.setValue(today)
    },
  },
}
</script>