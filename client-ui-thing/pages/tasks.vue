<template>
  <div class="flex h-screen items-center justify-center">
    <template v-for="entry in result.entries">
      <UiCard
        class="w-[360px] max-w-sm"
        :title="entry.task.description"
        description="This is a description"
      >
      </UiCard>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { Q_ENTRY } from "@/graphql/queries"

  const today = new Date()
  const { result } = useQuery(Q_ENTRY, {
    datesIn: [today.toISOString().slice(0, 10)],
  })
</script>
