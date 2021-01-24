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
                highContrastColor(prop.node.color)
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
          <q-btn
            flat
            dense
            rounded
            color="grey"
            label="Add Task"
            align="between"
            class="font-m-bold q-mx-md"
            icon="mdi-plus"
            @click="
              () => {
                Object.assign(newTask, { projectId: prop.node.id })
                addTask()
              }
            "
            @keypress.prevent
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
              @click="taskComplete(prop.node.id)"
            />
            <q-btn
              flat
              color="grey"
              round
              icon="mdi-pencil"
              @click="
                () => {
                  Object.assign(editedTask, prop.node)
                  updateTaskDialog = true
                }
              "
            />
            <q-btn
              flat
              dense
              rounded
              color="grey"
              label="Add Entry"
              align="between"
              class="font-m-bold q-ml-sm q-pr-sm"
              icon="mdi-plus"
              @click="
                () => {
                  Object.assign(newEntry, { taskId: prop.node.id })
                  addEntry()
                }
              "
              @keypress.prevent
            />
            {{
              secondsToTimestampPadded(prop.node.totalTimerTrackedTime).slice(
                0,
                -3,
              )
            }}
            /
            {{
              secondsToTimestampPadded(prop.node.totalTimerEstimatedTime).slice(
                0,
                -3,
              )
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
            @click="
              entryUpdate({
                id: prop.node.id,
                complete: false,
              })
            "
            icon="mdi-undo-variant"
          ></q-btn>
          <q-btn
            v-else
            flat
            round
            color="primary"
            icon="mdi-check"
            @click="entryComplete(prop.node.id)"
          />
          <q-btn
            flat
            round
            color="grey"
            @click="
              entryUpdate({
                id: prop.node.id,
                date: new Date().toISOString().substring(0, 10),
              })
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
                updateEntryDialog = true
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
    <q-dialog v-model="addEntryDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add Entry</div>
          <q-form ref="entryForm" class="q-gutter-md" @submit.prevent>
            <q-input
              class="q-pa-sm"
              outlined
              v-model="newEntry.description"
              label="New Entry"
              @keydown.enter="entryCreate"
            ></q-input>
            <q-input
              class="q-pa-sm"
              outlined
              v-model="newEntryEstimatedTime"
              mask="time"
              :rules="['time']"
              @keydown.enter="entryCreate"
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="newEntryEstimatedTime" format24h>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="addEntryDialog = false" />
          <q-btn flat label="Add" @click="entryCreate()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="addTaskDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Add Task</div>
          <q-form ref="taskForm" class="q-gutter-md" @submit.prevent>
            <q-input
              class="q-pa-sm"
              outlined
              v-model="newTask.description"
              label="New Task"
              @keydown.enter="taskCreate"
            ></q-input>
          </q-form>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="addTaskDialog = false" />
          <q-btn flat label="Add" @click="taskCreate()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="updateEntryDialog">
      <q-card v-if="editedEntry">
        <q-card-section>
          <div class="text-h6">Edit Entry</div>
          <q-form ref="entryForm" class="q-gutter-md" @submit.prevent>
            <q-input
              v-model="editedEntry.description"
              outlined
              label="Description"
            ></q-input>
            <q-input
              v-model="editedEntry.date"
              mask="####-##-##"
              outlined
              label="Date"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="editedEntry.date"
                      mask="YYYY-MM-DD"
                      first-day-of-week="1"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              v-model="editedEstimatedTime"
              mask="time"
              :rules="['time']"
              label="Estimated Time"
              outlined
              class="q-pb-none"
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="editedEstimatedTime" format24h>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              v-model="editedEntryTime"
              mask="time"
              :rules="['time']"
              label="Tracked Time"
              outlined
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="editedEntryTime" format24h>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Cancel"
            @click="
              () => {
                editedEntry = null
                updateEntryDialog = false
              }
            "
          />
          <q-btn flat label="Save" @click="entryUpdate(editedEntry)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="updateTaskDialog">
      <q-card v-if="editedTask">
        <q-card-section>
          <div class="text-h6">Edit Task</div>
          <q-form ref="entryForm" class="q-gutter-md" @submit.prevent>
            <q-input
              v-model="editedTask.description"
              outlined
              label="Description"
            ></q-input>
          </q-form>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Cancel"
            @click="
              () => {
                editedTask = {}
                updateTaskDialog = false
              }
            "
          />
          <q-btn flat label="Save" @click="taskUpdate(editedTask)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import {
  M_ENTRY_CREATE,
  M_ENTRY_COMPLETE,
  M_ENTRY_UPDATE,
  M_TASK_CREATE,
  M_TASK_UPDATE,
} from '@/graphql/mutations'
import {
  F_TASK_ENTRIES,
  F_PROJECT_TASKS,
  F_TASK,
  F_ENTRY,
} from '@/graphql/fragments'
export default {
  name: 'PlannerPanel',
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
      newTask: {
        description: null,
      },
      addEntryDialog: false,
      addTaskDialog: false,
      updateEntryDialog: false,
      editedEntry: null,
      updateTaskDialog: false,
      editedTask: {},
    }
  },
  methods: {
    addEntry() {
      this.addEntryDialog = true
    },
    addTask() {
      this.addTaskDialog = true
    },
    taskComplete(id) {
      this.$apollo.mutate({
        mutation: M_TASK_UPDATE,
        variables: {
          id,
          complete: true,
        },
        update: (store, { data: { taskUpdate } }) => {
          const task = store.readFragment({
            id: 'Task:' + id,
            fragment: F_TASK,
          })
          Object.assign(task, taskUpdate)
          store.writeFragment({
            id: 'Task:' + id,
            fragment: F_TASK,
            data: task,
          })
        },
      })
    },
    entryComplete(id) {
      this.$apollo.mutate({
        mutation: M_ENTRY_COMPLETE,
        variables: {
          id,
        },
        update: (store, { data: { entryComplete } }) => {
          const entry = store.readFragment({
            id: 'Entry:' + id,
            fragment: F_ENTRY,
          })
          Object.assign(entry, entryComplete)
          store.writeFragment({
            id: 'Entry:' + id,
            fragment: F_ENTRY,
            data: entry,
          })
        },
      })
    },
    entryCreate() {
      this.addEntryDialog = false
      var entry = this.newEntry
      if (this.newEntry.timerEstimatedTime) {
        entry.timerEstimatedTime = this.newEntry.timerEstimatedTime
      }
      console.log(entry)
      this.$apollo
        .mutate({
          mutation: M_ENTRY_CREATE,
          variables: entry,
          update: (store, { data: { entryCreate } }) => {
            const task = store.readFragment({
              id: 'Task:' + entryCreate.task.id,
              fragment: F_TASK_ENTRIES,
            })
            task.entries.push(entryCreate)
            store.writeFragment({
              id: 'Task:' + entryCreate.task.id,
              fragment: F_TASK_ENTRIES,
              data: task,
            })
          },
        })
        .catch((error) => {
          this.showErrors(error)
        })
      this.newEntry = {
        description: null,
        date: 'backlog',
        timerEstimatedTime: null,
      }
    },
    entryUpdate(newEntry) {
      this.$apollo.mutate({
        mutation: M_ENTRY_UPDATE,
        variables: newEntry,
        update: (store, { data: { entryUpdate } }) => {
          const entry = store.readFragment({
            id: 'Entry:' + entryUpdate.id,
            fragment: F_ENTRY,
          })
          Object.assign(entry, entryUpdate)
          store.writeFragment({
            id: 'Entry:' + entryUpdate.id,
            fragment: F_ENTRY,
            data: entry,
          })
        },
      })
      this.updateEntryDialog = false
    },
    taskUpdate(newTask) {
      this.$apollo
        .mutate({
          mutation: M_TASK_UPDATE,
          variables: newTask,
          update: (store, { data: { taskUpdate } }) => {
            const task = store.readFragment({
              id: 'Task:' + taskUpdate.id,
              fragment: F_TASK,
            })
            Object.assign(task, taskUpdate)
            store.writeFragment({
              id: 'Task:' + taskUpdate.id,
              fragment: F_TASK,
              data: task,
            })
          },
        })
        .catch((error) => {
          this.showErrors(error)
        })
      this.updateTaskDialog = false
    },
    taskCreate() {
      this.addTaskDialog = false
      var task = this.newTask
      this.$apollo
        .mutate({
          mutation: M_TASK_CREATE,
          variables: task,
          update: (store, { data: { taskCreate } }) => {
            const project = store.readFragment({
              id: 'Project:' + taskCreate.project.id,
              fragment: F_PROJECT_TASKS,
            })
            project.tasks.push(taskCreate)
            store.writeFragment({
              id: 'Project:' + taskCreate.project.id,
              fragment: F_PROJECT_TASKS,
              data: project,
            })
          },
        })
        .catch((error) => {
          this.showErrors(error)
        })
      this.newTask = {
        description: null,
      }
    },
    getProgress(tracked, estimated) {
      return estimated !== 0 ? tracked / estimated : 0
    },
    highContrastColor(color) {
      const rgbObj = this.hexToRgb(color)
      return this.highContrastText(rgbObj)
    },
  },
  computed: {
    newEntryEstimatedTime: {
      get() {
        return this.minutesToTimestamp(this.newEntry.timerEstimatedTime)
      },
      set(val) {
        this.newEntry.timerEstimatedTime = this.timestampToMinutes(val)
      },
    },
    editedEntryTime: {
      get() {
        return this.minutesToTimestamp(this.editedEntry.timerTrackedTime)
      },
      set(val) {
        this.editedEntry.timerTrackedTime = this.timestampToMinutes(val)
      },
    },
    editedEstimatedTime: {
      get() {
        return this.minutesToTimestamp(this.editedEntry.timerEstimatedTime)
      },
      set(val) {
        this.editedEntry.timerEstimatedTime = this.timestampToMinutes(val)
      },
    },
  },
}
</script>