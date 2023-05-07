<template>
  <div s>
    <q-list style="margin: auto; max-width: 750px">
      <Category
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
      <q-item>
        <q-item-section avatar>
          <button-add objectName="Category" @click="addCategoryDialog = true" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator spaced inset vertical dark />
    <ch-category-create-modal
      :show="addCategoryDialog"
      @hide="addCategoryDialog = false"
    />
  </div>
</template>
<script>
import Category from '@/components/Category.vue'
import ChCategoryCreateModal from '@/components/modal/CategoryCreateModal.vue'
import ButtonAdd from './ButtonAdd.vue'

export default {
  name: 'SettingsPanel',
  data: () => ({
    addCategoryDialog: false,
  }),
  props: {
    categories: {
      type: Array,
    },
  },
  components: {
    Category,
    ButtonAdd,
    ChCategoryCreateModal,
  },
  methods: {},
}
</script>
