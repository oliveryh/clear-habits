<template>
  <div class="flex grid items-center justify-center gap-4 pb-4 pt-4">
    <QuickAddTask v-model="showQuickAddTaskModal" />
    <div class="flex w-[360px] justify-between">
      <div class="flex items-center space-x-2">
        <UiSwitch id="show-completed" v-model:checked="showCompleted" />
        <UiLabel for="show-completed">Show Completed</UiLabel>
      </div>
      <div class="flex items-center space-x-2">
        <UiButton variant="secondary" @click="() => (showQuickAddTaskModal = true)">
          <Icon class="h-4 w-4" name="lucide:circle-check" />
          Quick Add
        </UiButton>
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
  import QuickAddTask from "@/components/modal/QuickAddTask.vue"
  import { useFilteredEntries } from "@/queries"

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
  const selectedEntryIndex = ref(0)
  const showCompleted = ref(false)
  const { entries, refetch: refetchEntries } = useFilteredEntries({
    datesIn: [today.toISOString().split("T")[0]],
  })
  const sortedEntries = computed(() =>
    entries.value.slice().sort((a, b) => a.listOrder - b.listOrder)
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

  const showQuickAddTaskModal = ref(false)

  // Refetch entries when the quick add task modal is closed
  watch(
    () => showQuickAddTaskModal.value,
    (value) => {
      if (value === false) {
        refetchEntries()
      }
    }
  )
</script>
