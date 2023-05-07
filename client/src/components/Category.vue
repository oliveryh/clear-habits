<template>
  <div>
    <q-expansion-item
      switch-toggle-side
      expand-icon-toggle
      expand-separator
      popup
      class="has-border font-m-medium"
    >
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar
            size="sm"
            :style="'background-color:' + category.color"
            text-color="white"
            class="q-pr-xs shadow-1"
          />
        </q-item-section>
        <q-item-section>{{ category.description }}</q-item-section>
        <q-item-section avatar>
          <q-avatar color="grey" size="sm" text-color="white">{{
            category.projects.length
          }}</q-avatar>
        </q-item-section>
        <q-item-section avatar class="q-pl-md"
          ><q-btn
            round
            flat
            color="grey"
            icon="mdi-pencil"
            @click="modal.categoryUpdate = true"
        /></q-item-section>
      </template>
      <q-list bordered separator>
        <Project
          v-for="project in category.projects"
          :key="project.id"
          :project="project"
        />
        <q-item>
          <q-item-section avatar>
            <button-add
              objectName="Project"
              @click="modal.projectCreate = true"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
    <ch-category-update-modal
      :category="category"
      :show="modal.categoryUpdate"
      @hide="modal.categoryUpdate = false"
    />
    <ch-project-create-modal
      :category="category"
      :show="modal.projectCreate"
      @hide="modal.projectCreate = false"
    />
  </div>
</template>

<script>
import ButtonAdd from '@/components/ButtonAdd.vue'
import Project from '@/components/Project.vue'
import ChCategoryUpdateModal from '@/components/modal/CategoryUpdateModal.vue'
import ChProjectCreateModal from '@/components/modal/ProjectCreateModal'

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
  components: {
    Project,
    ButtonAdd,
    ChProjectCreateModal,
    ChCategoryUpdateModal,
  },
  data: () => ({
    modal: {
      categoryUpdate: false,
      projectCreate: false,
    },
  }),
}
</script>
<style>
.selected {
  background: #bbb;
}
</style>
