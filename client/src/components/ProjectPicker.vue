<template>
  <div>
    <q-select
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
      class="font-m-medium underlined"
      @popup-hide="blurSelector"
      ref="selector"
      dense
    >
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
          <q-item-section v-if="showAvatar" avatar>
            <q-avatar
              size="sm"
              :style="'background-color:' + scope.opt.color"
              text-color="white"
              class="q-pr-xs shadow-1"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="font-m-medium">{{
              scope.opt.description
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
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
    showAvatar: {
      type: Boolean,
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
<style>
.underlined .q-field__inner .q-field__control {
  border-bottom: 3px solid #027be3;
}
</style>