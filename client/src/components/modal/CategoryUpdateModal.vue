<template>
  <q-dialog v-if="editedCategory != null" v-model="showModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Edit Category</div>
        <q-form ref="form" @submit.prevent>
          <q-input
            v-model="editedCategory.description"
            :rules="rules.categoryDescription"
          ></q-input>
          <q-input v-model="editedCategory.color" :rules="['anyColor']">
            <template v-slot:append>
              <q-icon name="mdi-eyedropper" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="editedCategory.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-btn
            outline
            icon="mdi-delete"
            label="Delete"
            @click="modal.categoryDelete = true"
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn
          flat
          label="Cancel"
          @click="
            showModal = false
            timerSet()
          "
        />
        <q-btn flat label="Save" @click="editorSave()" />
      </q-card-actions>
    </q-card>
    <ch-category-delete-modal
      :category="category"
      :show="modal.categoryDelete"
      @hide="modal.categoryDelete = false"
    />
  </q-dialog>
</template>

<script>
import ChCategoryDeleteModal from '@/components/modal/CategoryDeleteModal.vue'

export default {
  name: 'CategoryUpdateModal',
  components: {
    ChCategoryDeleteModal,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Object,
      required: true,
    },
  },
  watch: {
    show(value) {
      if (value) {
        this.editedCategory = Object.assign({}, this.category)
      }
    },
  },
  data: () => ({
    editedCategory: null,
    rules: {
      categoryDescription: [(v) => !!v || 'Description required'],
    },
    modal: {
      categoryDelete: false,
    },
  }),
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
    editorSave() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.showModal = false
          this.categoryUpdate(this.editedCategory)
        }
      })
    },
  },
}
</script>
