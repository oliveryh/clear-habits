<template>
  <UiCard class="w-[360px] max-w-sm">
    <template #title>
      <div class="mb-2">
        <span
          v-if="entry.task?.project?.category"
          class="rounded-md px-2 py-1 text-sm"
          :style="{ backgroundColor: entry.task.project.category.color }"
          :class="{ 'text-black': entry.task.project.category.colorContrast }"
        >
          {{ entry.task.project.description.toUpperCase() }}
        </span>
      </div>
      <UiCardTitle v-if="entry.task?.description">{{ entry.task.description }}</UiCardTitle>
    </template>
    <template #description>
      <UiCardDescription v-if="entry.description">{{ entry.description }}</UiCardDescription>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
  import type { Entry } from "@/gql/graphql"

  const props = defineProps<{
    entry: Entry
  }>()
</script>
