<template>
  <q-dialog v-model="showModal">
    <q-card>
      {{ this.newCategory }}
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
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="newCategory.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-form>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="showModal = false" />
        <q-btn flat label="Add" @click="categoryCreateLocal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'CategoryCreateModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newCategory: {
        description: null,
        color: null,
        projects: [],
      },
    }
  },
  computed: {
    showModal: {
      get() {
        return this.show
      },
      set(value) {
        this.$emit('hide', value)
      },
    },
  },
  methods: {
    categoryCreateLocal() {
      this.showModal = false
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

<style></style>
