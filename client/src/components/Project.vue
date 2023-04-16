<template>
  <div>
    <q-item>
      <q-item-section>{{ project.description }}</q-item-section>
      <q-item-section avatar>
        <q-chip v-if="project.targetDays" icon="mdi-bullseye-arrow"
          >{{ project.targetDays }} Days</q-chip
        >
      </q-item-section>
      <q-item-section side>
        <q-btn
          round
          flat
          color="grey"
          icon="mdi-pencil"
          @click="modal.projectUpdate = true"
        />
      </q-item-section>
    </q-item>
    <ch-project-update-modal
      :project="project"
      :show="modal.projectUpdate"
      @hide="modal.projectUpdate = false"
    />
  </div>
</template>

<script>
import ChProjectUpdateModal from '@/components/modal/ProjectUpdateModal.vue'

export default {
  name: 'Project',
  components: {
    ChProjectUpdateModal,
  },
  props: {
    project: {
      type: Object,
    },
  },
  data: () => ({
    modal: {
      projectUpdate: false,
    },
  }),
}
</script>
