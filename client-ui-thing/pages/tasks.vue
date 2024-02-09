<template>
  <div class="flex grid items-center justify-center gap-6 pb-4 pt-4">
    <div class="justify-right flex w-[360px]">
      <div class="flex items-center space-x-2">
        <UiSwitch id="show-completed" v-model:checked="showCompleted" />
        <UiLabel for="show-completed">Show Completed</UiLabel>
      </div>
    </div>
    <CategoryFilter class="flex-grow" v-model="selectedCategory" />
    <template v-for="entry in filteredEntries" :key="entry.id">
      <Entry :entry="entry" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import CategoryFilter from "@/components/CategoryFilter.vue"
  import Entry from "@/components/Entry.vue"
  import { graphql } from "@/gql/gql"

  const selectedCategory = ref(null)

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
