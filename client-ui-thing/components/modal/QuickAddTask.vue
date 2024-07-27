<template>
  <div class="flex w-full items-center justify-center">
    <UiDialog v-model:open="model">
      <UiDialogContent
        hideClose
        class="sm:max-w-[450px]"
        title="Quick Add Task"
        description="Select from your most frequently added tasks."
      >
        <template #content>
          <UiPopover v-model:open="open">
            <div class="flex justify-between">
              <UiPopoverTrigger as-child>
                <UiButton
                  variant="outline"
                  role="combobox"
                  :aria-expanded="open"
                  class="mb-0 w-[350px] justify-between"
                >
                  <template v-if="value">
                    <span
                      :class="
                        projectCategoryStyles({
                          contrast: value.project.category.colorContrast,
                        })
                      "
                      :style="{ backgroundColor: value.project.category.color }"
                    >
                      {{ value.project.description }}
                    </span>
                    {{ value.description }}
                    <UiBadge variant="secondary">
                      <Icon name="lucide:clock" class="mr-1 h-4 w-4" />
                      {{ secondsToSummary(value.latestMaxEntryTimerEstimatedTime) }}</UiBadge
                    ></template
                  >
                  <template v-else>Select a task...</template>
                  <Icon
                    name="lucide:chevrons-up-down"
                    class="ml-auto h-4 w-4 shrink-0 opacity-50"
                  />
                </UiButton>
              </UiPopoverTrigger>
              <UiButton class="ml-3 flex-grow" variant="secondary" size="sm" @click="createTask">
                <Icon name="lucide:plus" data-testid="pause-icon" />
              </UiButton>
            </div>
            <UiPopoverContent class="w-[350px] p-0">
              <UiCommand :filter-function="filterFunction" v-model="value">
                <UiCommandInput placeholder="Search framework..." />
                <UiCommandList>
                  <UiCommandEmpty>No tasks found.</UiCommandEmpty>
                  <UiCommandGroup>
                    <UiCommandItem
                      v-for="task in recentTasksWithProject"
                      :key="task.projectId + task.description"
                      :value="task"
                      @select="open = false"
                    >
                      <Icon
                        name="lucide:check"
                        :class="[
                          'mr-2 h-4 w-4',
                          value
                            ? value.projectId === task.projectId &&
                              value.description === task.description
                              ? 'opacity-100'
                              : 'opacity-0'
                            : 'opacity-0',
                        ]"
                      />
                      <span
                        :class="
                          projectCategoryStyles({
                            contrast: task.project.category.colorContrast,
                          })
                        "
                        :style="{ backgroundColor: task.project.category.color }"
                      >
                        {{ task.project.description }}
                      </span>
                      {{ task.description }}
                      <UiBadge variant="secondary">
                        <Icon name="lucide:clock" class="mr-1 h-4 w-4" />
                        {{ secondsToSummary(task.latestMaxEntryTimerEstimatedTime) }}</UiBadge
                      >
                    </UiCommandItem>
                  </UiCommandGroup>
                </UiCommandList>
              </UiCommand>
            </UiPopoverContent>
          </UiPopover>
        </template>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import { createEntryWithTask } from "@/mutations"
  import { useProjects, useRecentTasks } from "@/queries"
  import { secondsToSummary } from "@/utils/time"

  const model = defineModel()

  const recentTasks = useRecentTasks()
  const projects = useProjects()

  const projectIdToProject = computed(() =>
    projects.value.reduce((acc, project) => {
      acc[project.id] = project
      return acc
    }, {})
  )

  const recentTasksWithProject = computed(() =>
    recentTasks.value.map((task) => ({
      ...task,
      project: projectIdToProject.value[task.projectId],
    }))
  )

  const open = ref(false)

  const projectCategoryStyles = tv({
    base: "mr-1 rounded-md px-2 py-1 text-sm",
    variants: {
      contrast: {
        true: "text-black",
        false: "border border-gray-500 text-white",
      },
    },
  })

  const value = ref()

  // Focus on the dropdown when the modal opens
  watch(
    () => model.value,
    (modelValue) => {
      if (modelValue) {
        open.value = true
      } else {
        value.value = undefined
      }
    }
  )

  const filterFunction = (list: typeof recentTasksWithProject, search: string) => {
    return list.filter((i) => i.description.toLowerCase().includes(search.toLowerCase()))
  }

  const createTask = () => {
    const newEntryWithTask = {
      description: value.value.description,
      projectId: value.value.projectId,
      timerEstimatedTime: value.value.latestMaxEntryTimerEstimatedTime,
      date: new Date().toISOString().slice(0, 10),
    }
    const { mutate: createTask, onDone: announceUpdate } = createEntryWithTask(newEntryWithTask)
    createTask()
    announceUpdate(() => {
      useSonner.success(`Task "${value.value.description}" added`)
    })
  }
</script>
