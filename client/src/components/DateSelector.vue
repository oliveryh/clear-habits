<template>
  <div>
    <q-btn-group rounded outline>
      <q-btn
        color="primary"
        rounded
        outline
        class="q-pl-sm"
        padding="sm"
        icon="mdi-calendar"
      >
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            v-if="period == 'day'"
            v-model="calendarDate"
            first-day-of-week="1"
            @input="() => $refs.qDateProxy.hide()"
            mask="YYYY-MM-DD"
          />
          <q-date
            v-else
            v-model="monday"
            first-day-of-week="1"
            @input="() => $refs.qDateProxy.hide()"
            mask="YYYY-MM-DD"
          />
        </q-popup-proxy>
      </q-btn>
      <q-btn
        color="primary"
        rounded
        outline
        padding="sm"
        icon="mdi-arrow-left"
        @click="deltaWeek(-1)"
      />
      <q-btn
        color="primary"
        rounded
        outline
        padding="sm"
        class="font-m-bold"
        label="Now"
        @click="now()"
      />
      <q-btn
        color="primary"
        dense
        rounded
        outline
        padding="sm"
        class="q-pr-sm"
        icon="mdi-arrow-right"
        @click="deltaWeek(1)"
      />
    </q-btn-group>
  </div>
</template>

<script>
export default {
  name: 'DateSelector',
  props: {
    value: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      enum: ['week', 'day'],
    },
  },
  mounted() {
    this.now()
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
    monday: {
      get() {
        return this.value
      },
      set(value) {
        const monday = this.mondayOfWeek(new Date(value))
        this.setValue(monday)
      },
    },
  },
  methods: {
    setValue(value) {
      var dateISO = new Date(
        value.getTime() - value.getTimezoneOffset() * 60000,
      )
        .toISOString()
        .split('T')[0]
      this.$emit('input', dateISO)
    },
    deltaWeek(delta) {
      var newDate = new Date(this.value)
      const numDays = this.period == 'day' ? 1 : 7
      newDate.setDate(newDate.getDate() + delta * numDays)
      this.setValue(newDate)
    },
    now() {
      if (this.period == 'day') {
        this.today()
      } else {
        this.mondayThisWeek()
      }
    },
    mondayThisWeek() {
      var today = new Date()
      var mondayOfToday = this.mondayOfWeek(today)
      this.setValue(mondayOfToday)
    },
    today() {
      var today = new Date()
      this.setValue(today)
    },
  },
}
</script>