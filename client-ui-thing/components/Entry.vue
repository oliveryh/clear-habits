<template>
  <UiCard class="w-[360px] max-w-sm">
    <template #title>
      <UiCardTitle class="text-md" v-if="entry.task?.description">
        <div class="mb-2 flex space-x-2">
          <div>
            <span
              v-if="entry.task?.project?.category"
              :class="
                projectCategoryStyles({ contrast: entry.task.project.category.colorContrast })
              "
              :style="{ backgroundColor: entry.task.project.category.color }"
            >
              {{ entry.task.project.description }}
            </span>
          </div>
          <div>
            {{ entry.task.description }}
          </div>
        </div>
      </UiCardTitle>
    </template>
    <template #description>
      <UiCardDescription v-if="entry.description">
        <div class="mb-2">{{ entry.description }}</div></UiCardDescription
      >
      <div class="flex space-x-2">
        <div class="relative grow">
          <TransitionFade>
            <UiButton
              v-if="entry.timerActive"
              @click="stopEntry(props.entry)"
              variant="secondary"
              size="sm"
              :class="timerButtonStyles({ state: 'running', complete: entry.complete })"
            >
              <Icon name="lucide:pause" data-testid="pause-icon" />
              {{ trackedTimeFormattedLong }} · {{ estimatedTimeFormatted }}
            </UiButton>
            <UiButton
              v-else-if="entry.timerTrackedTime > 0"
              @click="startEntry(props.entry)"
              variant="secondary"
              size="sm"
              :class="timerButtonStyles({ state: 'paused', complete: entry.complete })"
            >
              <Icon name="lucide:play" data-testid="play-icon" />
              {{ trackedTimeFormattedShort }} · {{ estimatedTimeFormatted }}
            </UiButton>
            <UiButton
              v-else
              @click="startEntry(props.entry)"
              variant="secondary"
              size="sm"
              :class="timerButtonStyles({})"
            >
              <Icon name="lucide:play" data-testid="play-icon" />
              {{ trackedTimeFormattedShort }} · {{ estimatedTimeFormatted }}
            </UiButton>
          </TransitionFade>
        </div>
        <div class="flex">
          <UiButton
            v-if="entry.complete"
            variant="secondary"
            size="icon-sm"
            @click="restartEntry(props.entry)"
          >
            <Icon name="lucide:undo-2" data-testid="undo-2-icon" />
          </UiButton>
          <UiButton v-else variant="secondary" size="icon-sm" @click="completeEntry(props.entry)">
            <Icon name="lucide:check" data-testid="check-icon" />
          </UiButton>
        </div>
      </div>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
  import { completeEntry, restartEntry, startEntry, stopEntry } from "@/mutations"
  import { secondsToSummary } from "@/utils/time"
  import type { Entry } from "@/gql/graphql"

  const props = defineProps<{
    entry: Entry
  }>()

  const projectCategoryStyles = tv({
    base: "mr-1 rounded-md px-2 py-1 text-sm",
    variants: {
      contrast: {
        true: "text-black",
        false: "border border-gray-500 text-white",
      },
    },
  })

  const timerButtonStyles = tv({
    base: "absolute w-full",
    variants: {
      state: {
        running: "text-orange-500",
        paused: "text-yellow-500",
      },
    },
    compoundVariants: [
      {
        state: "paused",
        complete: true,
        class: "text-green-500",
      },
    ],
  })

  let timerInterval: ReturnType<typeof setInterval>
  let timerTrackedTime = ref(0)

  const estimatedTimeFormatted = computed(() => {
    return secondsToSummary(props.entry.timerEstimatedTime, false)
  })
  const trackedTimeFormattedLong = computed(() => {
    return secondsToSummary(timerTrackedTime.value, true)
  })
  const trackedTimeFormattedShort = computed(() => {
    return secondsToSummary(timerTrackedTime.value, false)
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
