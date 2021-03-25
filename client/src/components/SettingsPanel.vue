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

    <q-dialog v-model="addCategoryDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add Category</div>
          <q-form ref="taskForm" class="q-gutter-md" @submit.prevent>
            <q-input
              class="q-pa-sm"
              outlined
              v-model="newCategory.description"
              label="New Category"
              @keydown.enter="categoryCreateLocal"
            ></q-input>
            <q-input v-model="newCategory.color" :rules="['anyColor']">
              <template v-slot:append>
                <q-icon name="mdi-eyedropper" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color v-model="newCategory.color" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="addCategoryDialog = false" />
          <q-btn flat label="Add" @click="categoryCreateLocal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Category from '@/components/Category.vue'
import ButtonAdd from './ButtonAdd.vue'

export default {
  name: 'SettingsPanel',
  data: () => ({
    newCategory: {
      description: null,
      color: null,
      projects: [],
    },
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
  },
  methods: {
    categoryCreateLocal() {
      this.addCategoryDialog = false
      this.categoryCreate(this.newCategory)
      this.newCategory = {
        description: null,
        color: null,
        projects: [],
      }
    },
  },
}
</script>