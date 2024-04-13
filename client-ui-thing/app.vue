<template>
  <UiVueSonner />
  <ConfigProvider :use-id="useIdFunction">
    <NuxtPage />
  </ConfigProvider>
</template>

<script lang="ts" setup>
  // Used to provide id's to radix components in nuxt until Vue releases a useId
  const useIdFunction = () => useId()
</script>
