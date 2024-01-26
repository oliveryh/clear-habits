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
      <UiCardTitle class="text-md" v-if="entry.task?.description">{{
        entry.task.description
      }}</UiCardTitle>
    </template>
    <template #description>
      <UiCardDescription class="pb-2" v-if="entry.description">{{
        entry.description
      }}</UiCardDescription>
      <UiButton
        v-if="entry.timerActive"
        @click="stopEntry(props.entry)"
        :class="timerButtonStyles({ state: 'running' })"
      >
        <Icon name="lucide:pause" data-testid="pause-icon" />
        {{ trackedTimeFormatted }}
      </UiButton>
      <UiButton
        v-else-if="entry.timerTrackedTime > 0"
        @click="startEntry(props.entry)"
        :class="timerButtonStyles({ state: 'paused' })"
      >
        <Icon name="lucide:play" data-testid="play-icon" />
        {{ trackedTimeFormatted }}
      </UiButton>
      <UiButton
        v-else
        @click="startEntry(props.entry)"
        :class="timerButtonStyles({ state: 'unstarted' })"
      >
        <Icon name="lucide:play" data-testid="play-icon" />
        {{ trackedTimeFormatted }}
      </UiButton>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
  import { startEntry, stopEntry } from "@/mutations"
  import { secondsToTimestamp } from "@/utils/time"
  import type { Entry } from "@/gql/graphql"

  const props = defineProps<{
    entry: Entry
  }>()

  const timerButtonStyles = tv({
    variants: {
      state: {
        unstarted: "bg-green-500 hover:bg-green-600",
        running: "bg-rose-500 hover:bg-rose-600",
        paused: "bg-orange-500 hover:bg-orange-600",
      },
    },
  })

  let timerInterval: ReturnType<typeof setInterval>
  let timerTrackedTime = ref(0)

  const trackedTimeFormatted = computed(() => {
    return secondsToTimestamp(timerTrackedTime.value, {
      zeroPad: true,
      includeSeconds: true,
    })
  })

  onMounted(() => {
    timerSet()
  })

  watch(
    () => props.entry.timerActive,
    () => {
      timerSet()
    }
  )

  const timerSet = () => {
    timerTrackedTime.value = props.entry.timerTrackedTime
    if (props.entry.timerActive) {
      timerTrackedTime.value += parseInt(
        (Date.now() - new Date(props.entry.timerStartedAt).getTime()) / 1000
      )
    }
    if (props.entry.timerActive) {
      _timerStart()
    } else {
      _timerStop()
    }
  }
  const _timerStart = () => {
    clearInterval(timerInterval)
    timerInterval = setInterval(() => (timerTrackedTime.value += 1), 1000)
  }
  const _timerStop = () => {
    clearInterval(timerInterval)
  }
</script>
