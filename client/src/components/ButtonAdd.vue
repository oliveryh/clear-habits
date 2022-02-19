<template>
  <q-btn
    flat
    dense
    rounded
    color="grey"
    :label="compact ? None : 'Add ' + objectName"
    objectName
    :size="compact ? 'sm' : unset"
    align="between"
    class="font-m-bold q-pr-sm"
    :icon="compact ? compactIcon : 'mdi-plus'"
    @click="$emit('click')"
    @keypress.prevent
  >
  </q-btn>
</template>
<script>
export default {
  name: 'ButtonAdd',
  props: {
    objectName: {
      type: String,
    },
    compactIcon: {
      type: String,
    },
    compact: {
      type: Boolean,
    },
  },
}
</script>