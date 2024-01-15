<template>
  <div class="flex grid items-center justify-center gap-6 pt-4">
    <div class="justify-right flex w-full">
      <div class="flex items-center space-x-2">
        <UiSwitch id="show-completed" v-model:checked="showCompleted" />
        <UiLabel for="show-completed">Show Completed</UiLabel>
      </div>
    </div>
    <template v-for="entry in filteredEntries">
      <UiCard class="w-[360px] max-w-sm">
        <template #title>
          <div class="mb-2">
            <span
              class="rounded-md px-2 py-1 text-sm"
              :style="{ backgroundColor: entry.task.project.category.color }"
            >
              {{ entry.task.project.description.toUpperCase() }}
            </span>
          </div>
          <UiCardTitle>{{ entry.task.description }}</UiCardTitle>
        </template>
        <template #description>
          <UiCardDescription v-if="entry.description">{{ entry.description }}</UiCardDescription>
        </template>
      </UiCard>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { Q_ENTRY } from "@/graphql/queries"

  const today = new Date()

  const allEntries = ref([])

  const { onResult } = useQuery(Q_ENTRY, {
    datesIn: [today.toISOString().slice(0, 10)],
  })
  onResult((queryResult) => {
    if (queryResult.loading) return
    allEntries.value = queryResult.data.entries
  })

  const showCompleted = ref(false)
  const filteredEntries = computed(() => {
    if (showCompleted.value) return allEntries.value
    return allEntries.value.filter((entry) => !entry.complete)
  })
</script>
