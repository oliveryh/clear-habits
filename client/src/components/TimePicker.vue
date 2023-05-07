<template>
  <div class="q-pa-none">
    <q-input
      outlined
      v-model="timeFieldAsString"
      mask="time"
      :rules="['time']"
      fill-mask
      debounce="300"
      label="Estimated Time"
    >
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time v-model="timeFieldAsString" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <div class="q-gutter-sm q-ma-sm">
      <q-btn
        no-caps
        padding="sm"
        rounded
        shadow-1
        icon="mdi-refresh"
        @click="timeField = 0"
        exact
      >
      </q-btn>
      <q-btn-group rounded>
        <q-btn
          v-for="addition in timerAdditionOptions"
          :key="addition"
          no-caps
          padding="sm"
          shadow-1
          @click="timeField += 60 * addition"
          exact
        >
          <q-tooltip>Add {{ addition }} minutes to timer</q-tooltip>
          +{{ addition }}m
        </q-btn>
      </q-btn-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimePicker',
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    timerAdditionOptions: [5, 10, 15, 20, 30],
  }),
  computed: {
    timeFieldAsString: {
      get() {
        return this.secondsToTimestamp(this.value, {
          zeroPad: true,
        })
      },
      set(val) {
        this.$emit('input', this.timestampToSeconds(val))
      },
    },
    timeField: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style></style>
