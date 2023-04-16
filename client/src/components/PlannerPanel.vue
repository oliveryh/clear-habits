<template>
  <div>
    <q-tree
      label-key="description"
      node-key="nodeId"
      :nodes="planner"
      default-expand-all
      class="font-m-bold"
    >
      <template v-slot:default-header="prop">
        <div class="row items-center">
          <div
            v-if="prop.node.description"
            class="text-weight-bold text-primary"
          >
            {{ prop.node.description }}
          </div>
          <div v-else class="text-weight-bold text-primary">No Description</div>
        </div>
      </template>
      <template v-slot:header-category="prop">
        <div class="row items-center">
          <div class="text-headline text-left">
            <div
              :style="
                'background-color: ' +
                prop.node.color +
                '; color: ' +
                (prop.node.colorContrast ? 'black' : 'white')
              "
              style="
                border-radius: 5px;
                padding: 2px 5px 2px;
                margin-bottom: 4px;
                display: inline-block;
              "
              class="font-m-bold"
            >
              {{ prop.node.description | allCapitals }}
            </div>
          </div>
          <q-avatar class="q-ml-md" color="grey" size="sm" text-color="white">{{
            prop.node.numTasks
          }}</q-avatar>
        </div>
      </template>
      <template v-slot:header-project="prop">
        <div class="row items-center" @click.stop @keypress.stop>
          <div class="text-weight-bold text-primary">
            {{ prop.node.description }}
          </div>
          <q-avatar class="q-ml-md" color="grey" size="sm" text-color="white">{{
            prop.node.numTasks
          }}</q-avatar>
          <button-add
            objectName="Task"
            @click="
              () => {
                project = prop.node
                modal.taskCreate = true
              }
            "
            class="q-ml-sm"
          />
        </div>
      </template>
      <template v-slot:header-task="prop">
        <div
          class="row items-center"
          @click.stop
          @keypress.stop
          style="width: 100%"
        >
          <div class="col col-12 items-center">
            <div
              class="text-weight-bold text-primary"
              style="display: inline-block"
            >
              {{ prop.node.description }}
            </div>
            <q-btn
              flat
              round
              class="font-m-bold q-ml-sm"
              color="primary"
              icon="mdi-check"
              @click="updateTask({ id: prop.node.id, complete: true })"
            />
            <q-btn
              flat
              color="grey"
              round
              icon="mdi-pencil"
              @click="
                () => {
                  Object.assign(editedTask, prop.node)
                  modal.taskUpdate = true
                }
              "
            />
            <button-add
              objectName="Entry"
              @click="
                () => {
                  Object.assign(newEntry, { taskId: prop.node.id })
                  modal.entryCreate = true
                }
              "
              class="q-ml-sm"
            />
            {{
              secondsToTimestamp(prop.node.totalTimerTrackedTime, {zeroPad: true}),
            }}
            /
            {{
              secondsToTimestamp(prop.node.totalTimerEstimatedTime, {zeroPad: true}),
            }}
          </div>
          <div class="col col-12" style="margin-top: -10px">
            <q-linear-progress
              :style="{
                width:
                  Math.min(
                    Math.round(prop.node.totalTimerEstimatedTime / 180),
                    100,
                  ) + '%',
              }"
              style="margin: 5px 0px 0px; display: block"
              size="7px"
              :value="
                getProgress(
                  prop.node.totalTimerTrackedTime,
                  prop.node.totalTimerEstimatedTime,
                )
              "
              rounded
              :color="
                prop.node.totalTimerEstimatedTime <
                prop.node.totalTimerTrackedTime
                  ? 'red'
                  : 'primary'
              "
              track-color="grey"
            />
          </div>
        </div>
      </template>
      <template v-slot:header-entry="prop">
        <div class="row items-center">
          <div v-if="prop.node.complete" class="text-weight-bold text-grey-5">
            {{ prop.node.description }}
          </div>
          <div v-else class="text-weight-bold text-primary">
            {{ prop.node.description }}
          </div>
          <q-btn
            v-if="prop.node.complete"
            flat
            round
            color="orange"
            @click="updateEntry({ id: prop.node.id, complete: false })"
            icon="mdi-undo-variant"
          ></q-btn>
          <q-btn
            v-else
            flat
            round
            color="primary"
            icon="mdi-check"
            @click="completeEntry(prop.node.id)"
          />
          <q-btn
            flat
            round
            color="grey"
            @click="
              () => {
                updateEntry({
                  id: prop.node.id,
                  date: new Date().toISOString().substring(0, 10),
                })
                modal.entryUpdate = false
              }
            "
            icon="mdi-calendar-start"
            ><q-tooltip :delay="750"> Schedule today </q-tooltip></q-btn
          >
          <q-btn
            flat
            color="grey"
            round
            icon="mdi-pencil"
            @click="
              () => {
                editedEntry = prop.node
                modal.entryUpdate = true
              }
            "
          />
        </div>
      </template>
      <template v-slot:body-entry="prop">
        <div
          class="text-subtitle1 q-my-none font-m-medium"
          :v-if="prop.node.date != 'backlog'"
        >
          {{ prop.node.date }}
        </div>
      </template>
    </q-tree>
    <ch-task-create-modal
      :show="modal.taskCreate"
      :project="project"
      @hide="
        () => {
          modal.taskCreate = false
          project = null
        }
      "
    />
    <ch-task-update-modal
      :task="editedTask"
      :show="modal.taskUpdate"
      @hide="modal.taskUpdate = false"
    />
    <ch-entry-create-modal
      :entry="newEntry"
      :show="modal.entryCreate"
      @hide="modal.entryCreate = false"
    />
    <ch-entry-update-modal
      :entry="editedEntry"
      :edit-task="false"
      :show="modal.entryUpdate"
      @hide="modal.entryUpdate = false"
    />
  </div>
</template>
<script>
import ChEntryCreateModal from '@/components/modal/EntryCreateModal.vue'
import ChEntryUpdateModal from '@/components/modal/EntryUpdateModal.vue'
import ChTaskCreateModal from '@/components/modal/TaskCreateModal.vue'
import ChTaskUpdateModal from '@/components/modal/TaskUpdateModal.vue'
import ButtonAdd from './ButtonAdd.vue'

export default {
  name: 'PlannerPanel',
  components: {
    ButtonAdd,
    ChEntryCreateModal,
    ChTaskCreateModal,
    ChEntryUpdateModal,
    ChTaskUpdateModal,
  },
  props: {
    planner: {
      type: Array,
    },
  },
  data() {
    return {
      newEntry: {
        description: null,
        date: 'backlog',
        timerEstimatedTime: null,
      },
      project: null,
      editedEntry: {},
      editedTask: {},
      modal: {
        entryCreate: false,
        entryUpdate: false,
        taskCreate: false,
        taskUpdate: false,
      },
    }
  },
  methods: {
    getProgress(tracked, estimated) {
      return estimated !== 0 ? tracked / estimated : 0
    },
  },
}
</script>
