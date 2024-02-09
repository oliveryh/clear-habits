<template>
  <div class="flex justify-center">
    <UiPopover v-model:open="open">
      <UiPopoverTrigger as-child>
        <UiButton
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-full justify-between"
        >
          {{ model ? selectedCategory : "Select a category..." }}

          <Icon name="lucide:chevrons-up-down" class="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </UiButton>
        <UiButton variant="outline" role="clear" size="icon" class="ml-2" @click="model = null">
          <Icon name="lucide:x" class="h-4 w-4 shrink-0 opacity-50" />
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="flex-grow p-0">
        <UiCommand :filter-function="filterFunction" v-model="model">
          <UiCommandInput :show-cancel="true" placeholder="Search category..." />
          <UiCommandList>
            <UiCommandEmpty>No framework found.</UiCommandEmpty>
            <UiCommandGroup>
              <UiCommandItem
                v-for="category in sortedCategories"
                :key="category.id"
                :value="category"
                @select="open = false"
              >
                <div
                  class="flex h-6 w-6 items-center justify-center rounded-full"
                  :style="{ backgroundColor: category.color }"
                >
                  <Icon
                    name="lucide:check"
                    :class="[
                      'h-4 w-4',
                      model?.id === category.id ? 'opacity-100' : 'opacity-0',
                      category.colorContrast === true ? 'text-black' : 'text-white',
                    ]"
                  />
                </div>
                {{ category.description }}
              </UiCommandItem>
            </UiCommandGroup>
          </UiCommandList>
        </UiCommand>
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>

<script setup lang="ts">
  import { graphql } from "@/gql/gql"
  import { useCategories } from "@/queries"

  const model = defineModel()

  const { data } = await useCategories()
  const allCategories = computed(() => data.value?.categories ?? [])

  const open = ref(false)

  const selectedCategory = computed(
    () => allCategories.value.find((category) => category.id === model?.value?.id)?.description
  )

  const sortedCategories = computed(() =>
    allCategories.value.slice().sort((a, b) => a.description.localeCompare(b.description))
  )

  const filterFunction = (list: typeof categories, search: string) =>
    list.filter((i) => i.description.toLowerCase().includes(search.toLowerCase()))
</script>
