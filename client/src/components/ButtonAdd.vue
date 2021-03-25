<template>
  <q-btn
    flat
    dense
    rounded
    color="grey"
    :label="'Add ' + objectName"
    objectName
    align="between"
    class="font-m-bold q-pr-sm"
    icon="mdi-plus"
    @click="$emit('click')"
    @keypress.prevent
  />
</template>
<script>
export default {
  name: 'ButtonAdd',
  props: {
    objectName: {
      type: String,
    },
  },
}
</script>