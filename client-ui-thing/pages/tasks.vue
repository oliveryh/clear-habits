<template>
  <div class="flex grid items-center justify-center gap-6 pt-4">
    <div class="justify-right flex w-[360px]">
      <div class="flex items-center space-x-2">
        <UiSwitch id="show-completed" v-model:checked="showCompleted" />
        <UiLabel for="show-completed">Show Completed</UiLabel>
      </div>
    </div>
    <template v-for="entry in filteredEntries" :key="entry.id">
      <Entry :entry="entry" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import Entry from "@/components/Entry.vue"
  import { graphql } from "@/gql/gql"

  const today = new Date()
  const entries = graphql(`
    query filteredEntries($datesIn: [String!]!) {
      entries(filter: { date: { in: $datesIn } }) {
        id
        description
        complete
        date
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
  const filteredEntries = computed(() => {
    if (showCompleted.value) return allEntries.value
    return allEntries.value.filter((entry) => !entry.complete)
  })
</script>
