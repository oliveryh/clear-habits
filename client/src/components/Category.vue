<template>
  <div>
    <q-card v-bind:class="{ selected: this.selected }" class="my-card">
      <q-card-section>
        <div class="row">
          <div class="q-pr-md" :style="'color: ' + category.color">
            <q-icon name="mdi-checkbox-blank-circle" />
          </div>
          <div class="text-h6">{{ category.description }}</div>
          <q-space />
          <q-btn
            flat
            style="display: inline"
            color="grey"
            @click="editorOpen()"
            icon="mdi-pencil"
          ></q-btn>
          <q-btn
            flat
            style="display: inline"
            color="grey"
            @click="selectCategory()"
            icon="mdi-arrow-right"
          ></q-btn>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-if="editedCategory != null" v-model="editorDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit Category</div>
          <q-form ref="form" @submit.prevent>
            <q-input v-model="editedCategory.description" r></q-input>
            <q-input v-model="editedCategory.color" :rules="['anyColor']">
              <template v-slot:append>
                <q-icon name="mdi-eyedropper" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color v-model="editedCategory.color" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-btn
              outline
              icon="mdi-delete"
              label="Delete"
              @click="deleteDialog = true"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Cancel"
            @click="
              editorDialog = false
              timerSet()
            "
          />
          <q-btn flat label="Save" @click="editorSave()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Are you sure you'd like to delete this?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="warning"
            @click="categoryDelete"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  M_CATEGORY_UPDATE,
  M_CATEGORY_DELETE,
  M_SETTINGS_UPDATE,
} from '@/graphql/mutations'
import { Q_CATEGORY } from '@/graphql/queries'

export default {
  name: 'Category',
  props: {
    category: {
      type: Object,
    },
    selected: {
      type: Boolean,
    },
  },
  data: () => ({
    categoryRules: [(v) => !!v || 'Description required'],
    editorDialog: false,
    editedCategory: null,
    deleteDialog: false,
  }),
  methods: {
    // category
    categoryUpdate(category) {
      this.$apollo.mutate({
        mutation: M_CATEGORY_UPDATE,
        variables: category,
        update: (store, { data: { categoryUpdate } }) => {
          const data = store.readQuery({
            query: Q_CATEGORY,
          })
          const alteredCategory = data.categories.find(
            (c) => c.id === category.id,
          )
          Object.assign(alteredCategory, categoryUpdate)
          store.writeQuery({
            query: Q_CATEGORY,
            data,
          })
        },
      })
    },
    categoryDelete() {
      const category = this.category
      this.$apollo.mutate({
        mutation: M_CATEGORY_DELETE,
        variables: category,
        update: (store, { data: { categoryDelete } }) => {
          if (categoryDelete) {
            const data = store.readQuery({
              query: Q_CATEGORY,
            })
            data.categories = data.categories.filter((c) => {
              return c.id !== category.id
            })
            store.writeQuery({
              query: Q_CATEGORY,
              data,
            })
          }
        },
      })
    },
    // editor
    editorOpen() {
      this.editedCategory = Object.assign({}, this.category)
      this.editorDialog = true
    },
    editorSave() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.editorDialog = false
          this.categoryUpdate(this.editedCategory)
        }
      })
    },
    selectCategory() {
      this.$apollo.mutate({
        mutation: M_SETTINGS_UPDATE,
        variables: {
          categorySelected: this.category.id,
        },
      })
    },
  },
}
</script>
<style scoped>
.selected {
  background: #bbb;
}
</style>