<template>
  <div class="flex grid items-center justify-center gap-4 pb-4 pt-4">
    <div class="justify-right flex w-[360px]">
      <div class="flex items-center space-x-2">
        <UiSwitch id="show-completed" v-model:checked="showCompleted" />
        <UiLabel for="show-completed">Show Completed</UiLabel>
      </div>
    </div>
    <CategoryFilter class="flex-grow" v-model="selectedCategory" />
    <template v-for="(entry, index) in filteredEntries" :key="entry.id">
      <Entry :entry="entry" :selected="index === selectedEntryIndex" @keydown="onKeyDown" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import CategoryFilter from "@/components/CategoryFilter.vue"
  import Entry from "@/components/Entry.vue"
  import { graphql } from "@/gql/gql"

  const selectedCategory = ref(null)

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Tab") {
      e.preventDefault()
    }
    if (e.key === "ArrowDown") {
      selectedEntryIndex.value++
    }
    if (e.key === "ArrowUp") {
      selectedEntryIndex.value--
    }
    // If the tab key is pressed, move the focus to the next entry
    if (e.key === "Tab") {
      if (e.shiftKey) {
        selectedEntryIndex.value--
      } else {
        selectedEntryIndex.value++
      }
    }
    // Ensure the selected entry index is within bounds
    if (selectedEntryIndex.value < 0) selectedEntryIndex.value = 0
    if (selectedEntryIndex.value >= filteredEntries.value.length)
      selectedEntryIndex.value = filteredEntries.value.length - 1
  }

  const today = new Date()
  const entries = graphql(`
    query filteredEntries($datesIn: [String!]!) {
      entries(filter: { date: { in: $datesIn } }) {
        id
        description
        complete
        date
        timerActive
        timerTrackedTime
        timerStartedAt
        timerEstimatedTime
        listOrder
        task {
          id
          description
          project {
            id
            description
            category {
              id
              color
              colorContrast
              description
            }
          }
        }
      }
    }
  `)
  const selectedEntryIndex = ref(0)
  const showCompleted = ref(false)
  const { result } = useQuery(entries, {
    datesIn: [today.toISOString().split("T")[0]],
  })
  const allEntries = computed(() => result.value?.entries ?? [])
  const sortedEntries = computed(() =>
    allEntries.value.slice().sort((a, b) => a.listOrder - b.listOrder)
  )
  const filteredEntries = computed(() => {
    let entries = sortedEntries.value
    if (!showCompleted.value) entries = entries.filter((entry) => !entry.complete)
    if (selectedCategory.value)
      entries = entries.filter(
        (entry) => entry.task?.project?.category?.id === selectedCategory.value.id
      )
    return entries
  })
</script>
