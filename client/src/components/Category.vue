<template>
  <div>
    <q-card v-bind:class="{ 'selected': this.selected }" class="my-card">
      <q-card-section>
        <div class="row">
          <div class="q-pr-md" :style="'color: ' + category.color">
            <q-icon name="mdi-checkbox-blank-circle" />
          </div>
          <div class="text-h6">{{ category.description }}</div>
          <q-space />
          <q-btn flat style="display: inline" color="grey" @click="editorOpen()" icon="mdi-pencil"></q-btn>
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
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color v-model="editedCategory.color" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-btn outline icon="mdi-delete" label="Delete" @click="deleteDialog = true" />
          </q-form>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="editorDialog = false; timerSet()" />
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
          <q-btn flat label="Delete" color="warning" @click="categoryDelete" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { A_CATEGORY_UPDATE, A_CATEGORY_DELETE } from '@/store/actions.type'
import { M_CATEGORY_SELECT } from '@/store/mutations.type'

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
      this.$store.dispatch(A_CATEGORY_UPDATE, category)
    },
    categoryDelete() {
      this.$store.dispatch(A_CATEGORY_DELETE, this.category)
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
      this.$store.commit(M_CATEGORY_SELECT, this.category._id)
    },
  },
}
</script>
<style scoped>
.selected {
  background: #bbb;
}
</style>