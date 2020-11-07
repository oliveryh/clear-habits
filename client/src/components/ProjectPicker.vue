<template>
  <div>
    <q-select
      outlined
      v-model="project"
      use-input
      hide-selected
      fill-input
      clearable
      input-debounce="0"
      :label="label"
      option-label="description"
      option-value="_id"
      :options="options"
      @filter="filterFn"
      @popup-hide="blurSelector"
      ref="selector"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">No results</q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>
<script>
export default {
  name: 'ProjectPicker',
  props: {
    value: {
      type: Object,
    },
    projects: {
      type: Array,
    },
    label: {
      type: String,
    },
  },
  computed: {
    project: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  data: () => ({
    options: null,
  }),
  methods: {
    filterFn(val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.options = this.projects.filter(
          (v) => v.description.toLowerCase().indexOf(needle) > -1,
        )
      })
    },
    blurSelector() {
      this.$refs.selector.blur()
    },
  },
}
</script>