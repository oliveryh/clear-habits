<template>
  <UiCard class="w-[360px] max-w-sm">
    <template #title>
      <div class="mb-2">
        <span
          v-if="entry.task?.project?.category"
          :class="projectCategoryStyles({ contrast: entry.task.project.category.colorContrast })"
          :style="{ backgroundColor: entry.task.project.category.color }"
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
      <div class="flex space-x-2">
        <div class="grow">
          <UiButton
            v-if="entry.timerActive"
            @click="stopEntry(props.entry)"
            :class="
              timerButtonStyles({ state: 'running', complete: entry.complete, class: 'w-full' })
            "
          >
            <Icon name="lucide:pause" data-testid="pause-icon" />
            {{ trackedTimeFormatted }}
          </UiButton>
          <UiButton
            v-else-if="entry.timerTrackedTime > 0"
            @click="startEntry(props.entry)"
            :class="
              timerButtonStyles({ state: 'paused', complete: entry.complete, class: 'w-full' })
            "
          >
            <Icon name="lucide:play" data-testid="play-icon" />
            {{ trackedTimeFormatted }}
          </UiButton>
          <UiButton v-else @click="startEntry(props.entry)">
            <Icon name="lucide:play" data-testid="play-icon" />
            {{ trackedTimeFormatted }}
          </UiButton>
        </div>
        <div class="flex">
          <UiButton v-if="entry.complete" size="icon" @click="restartEntry(props.entry)">
            <Icon name="lucide:undo-2" data-testid="undo-2-icon" />
          </UiButton>
          <UiButton v-else size="icon" @click="completeEntry(props.entry)">
            <Icon name="lucide:check" data-testid="check-icon" />
          </UiButton>
        </div>
      </div>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
  import { completeEntry, restartEntry, startEntry, stopEntry } from "@/mutations"
  import { secondsToTimestamp } from "@/utils/time"
  import type { Entry } from "@/gql/graphql"

  const props = defineProps<{
    entry: Entry
  }>()

  const projectCategoryStyles = tv({
    base: "rounded-md px-2 py-1 text-sm",
    variants: {
      contrast: {
        true: "text-black",
        false: "border border-gray-500 text-white",
      },
    },
  })

  const timerButtonStyles = tv({
    base: "w-full",
    variants: {
      state: {
        running: "bg-orange-500 hover:bg-orange-600",
        paused: "bg-yellow-500 hover:bg-yellow-600",
      },
    },
    compoundVariants: [
      {
        state: "paused",
        complete: true,
        class: "bg-green-500 hover:bg-green-600",
      },
    ],
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
