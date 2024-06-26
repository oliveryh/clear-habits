<template>
  <Primitive :as="as" :as-child="asChild" :class="styles({ class: props.class })">
    <slot>
      <slot name="header">
        <UiCardHeader>
          <slot name="title">
            <UiCardTitle v-if="title || $slots.title" :title="title" />
          </slot>
          <slot name="description">
            <UiCardDescription
              v-if="description || $slots.description"
              :description="description"
            />
          </slot>
        </UiCardHeader>
      </slot>
      <slot name="content" v-if="content || $slots.content">
        <UiCardContent>
          <div v-html="content"></div>
        </UiCardContent>
      </slot>
      <slot name="footer"></slot>
    </slot>
  </Primitive>
</template>

<script lang="ts" setup>
  /**
   * A copy of the `Card` component except that it's a selectable card.
   * Note use of this card may produce unwated effects on input fields.
   */
  import { Primitive } from "radix-vue"
  import type { PrimitiveProps } from "radix-vue"

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Title that should be displayed. Passed to the `CardTitle` component */
        title?: string
        /** Description that should be displayed. Passed to the `CardDescription` component */
        description?: string
        /** Content that should be displayed. Passed to the `CardContent` component */
        content?: string
        /** Custom class(es) to add to the element */
        class?: any
      }
    >(),
    {
      as: "button",
    }
  )

  const styles = tv({
    base: "rounded-lg rounded-md border border border-input bg-background bg-card text-justify text-card-foreground shadow-sm ring-offset-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-2",
  })
</script>
