<template>
  <div>
    <q-card style="border-radius: 15px">
      <q-card-section style="padding: 10px; padding-bottom: 0px">
        <div v-if="entry.task.project" class="text-headline text-left">
          <div
            :style="
              'background-color: ' +
              entry.task.project.category.color +
              '; color: ' +
              (entry.task.project.category.colorContrast ? 'black' : 'white')
            "
            style="
              border-radius: 5px;
              padding: 2px 5px 2px;
              margin-bottom: 4px;
              display: inline-block;
            "
            class="font-m-bold"
          >
            {{ entry.task.project.description | allCapitals }}
          </div>
        </div>
        <div v-else class="text-headline text-left">NONE</div>
        <div class="text-subtitle-2 text-weight-medium text-left font-m-medium">
          {{ entry.task.description }}
          <q-btn
            class="q-px-none"
            flat
            size="sm"
            color="grey"
            round
            dense
            @click="this.modal.taskDetails = true"
            icon="mdi-chart-bar"
          ></q-btn>
          <q-btn
            class="q-px-none"
            flat
            size="sm"
            color="grey"
            round
            dense
            @click="this.modal.taskSimilar = true"
            icon="mdi-calendar-multiple-check"
          ></q-btn>
        </div>
        <div
          v-if="entry.description"
          class="text-subtitle-2 text-weight-medium text-left font-m-light"
        >
          {{ entry.description }}
        </div>
      </q-card-section>
      <q-card-actions align="left" style="margin: 2px; padding-top: 4px">
        <q-btn
          color="red-12"
          push
          dense
          :size="isMobile() ? '11px' : 'md'"
          class="font-m-medium"
          style="border-radius: 10px; border: 4px; margin-top: 0"
          v-if="entry.timerActive"
          @click="stopEntry(entry)"
          icon="mdi-stop"
        >
          <div v-html="timerLabel"></div
        ></q-btn>
        <q-btn
          :color="timerTrackedTime > 0 ? 'orange' : 'green-14'"
          outline
          dense
          :size="isMobile() ? '11px' : 'md'"
          class="font-m-medium"
          style="background: #ff0080; border-radius: 10px; border: 4px"
          v-else
          @click="startEntry(entry)"
          icon="mdi-play"
        >
          <div v-html="timerLabel"></div
        ></q-btn>
        <q-space />
        <q-btn-group flat>
          <q-btn
            v-if="entry.complete"
            flat
            color="orange"
            dense
            round
            @click="
              entry.complete = false
              restartEntry(entry)
            "
            icon="mdi-undo-variant"
          ></q-btn>
          <q-btn
            v-else
            flat
            color="green"
            dense
            :size="isMobile() ? '11px' : 'md'"
            round
            @click="completeEntry(entry.id)"
            icon="mdi-check"
          ></q-btn>
          <q-btn
            class="q-px-none"
            flat
            color="grey"
            round
            :size="isMobile() ? '11px' : 'md'"
            dense
            @click="modal.entryUpdate = true"
            icon="mdi-pencil"
          ></q-btn>
        </q-btn-group>
        <q-linear-progress
          style="margin: 5px 0px 0px"
          size="7px"
          :value="progress"
          rounded
          :color="
            entry.timerEstimatedTime < timerTrackedTime ? 'red' : 'primary'
          "
          track-color="grey"
        />
      </q-card-actions>
    </q-card>
    <ch-entry-update-modal
      :entry="entry"
      :show="modal.entryUpdate"
      @hide="modal.entryUpdate = false"
    />
    <ch-task-details-modal
      :entry="entry"
      :show="modal.taskDetails"
      @hide="modal.taskDetails = false"
    />
    <ch-task-similar-tasks-modal
      :entry="entry"
      :show="modal.taskSimilar"
      @hide="modal.taskSimilar = false"
    />
  </div>
</template>

<script>
import ChEntryUpdateModal from '@/components/modal/EntryUpdateModal.vue'
import ChTaskDetailsModal from '@/components/modal/TaskDetailsModal.vue'
import ChTaskSimilarTasksModal from '@/components/modal/TaskSimilarTasksModal.vue'

export default {
  name: 'Entry',
  props: {
    entry: {
      type: Object,
    },
  },
  components: {
    ChEntryUpdateModal,
    ChTaskSimilarTasksModal,
    ChTaskDetailsModal,
  },
  data: () => ({
    timerTrackedTime: null,
    timerInterval: null,
    modal: {
      entryUpdate: false,
      taskDetails: false,
      taskSimilar: false,
    },
  }),
  created() {
    this.timerSet()
  },
  watch: {
    $props: {
      deep: true,
      handler() {
        this.timerSet()
      },
    },
  },
  computed: {
    progress() {
      if (this.entry.timerEstimatedTime !== 0) {
        return this.timerTrackedTime / this.entry.timerEstimatedTime
      } else {
        return 0
      }
    },
    timerLabel() {
      return (
        this.secondsToTimestamp(this.timerTrackedTime, {
          includeSeconds: true,
        }) +
        '<small>/' +
        this.secondsToTimestamp(this.entry.timerEstimatedTime) +
        '</small>'
      )
    },
  },
  methods: {
    // timer
    timerSet() {
      this.timerTrackedTime = this.entry.timerTrackedTime
      if (this.entry.timerActive) {
        this.timerTrackedTime += parseInt(
          (Date.now() - new Date(this.entry.timerStartedAt).getTime()) / 1000,
        )
      }
      if (this.entry.timerActive) {
        this.timerStart()
      } else {
        this.timerStop()
      }
    },
    timerStart() {
      clearInterval(this.timerInterval)
      this.timerInterval = setInterval(() => (this.timerTrackedTime += 1), 1000)
    },
    timerStop() {
      clearInterval(this.timerInterval)
    },
  },
}
</script>

<style>
.q-btn--outline .q-btn__wrapper::before {
  border: 2.5px solid;
}
.bx--chart-holder.fullscreen {
  background-color: white;
  padding: 50px;
}
</style>
