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
                Object.assign(newTask, { projectId: prop.node.id })
                addTask()
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
                  updateTaskDialog = true
                }
              "
            />
            <button-add
              objectName="Entry"
              @click="
                () => {
                  Object.assign(newEntry, { taskId: prop.node.id })
                  addEntry()
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
                updateEntryDialog = false
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
              @keydown.enter="createEntryLocal"
            ></q-input>
            <q-input
              class="q-pa-sm"
              outlined
              v-model="newEntryEstimatedTime"
              mask="time"
              :rules="['time']"
              @keydown.enter="createEntryLocal"
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
          <q-btn flat label="Add" @click="createEntryLocal" />
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
              @keydown.enter="createTaskLocal"
            ></q-input>
          </q-form>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="addTaskDialog = false" />
          <q-btn flat label="Add" @click="createTaskLocal" />
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
          <q-btn
            flat
            label="Save"
            @click="
              () => {
                updateEntry(editedEntry)
                updateEntryDialog = false
              }
            "
          />
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
          <q-btn
            flat
            label="Save"
            @click="
              () => {
                updateTask(editedTask)
                this.updateTaskDialog = false
              }
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import ButtonAdd from './ButtonAdd.vue'

export default {
  name: 'PlannerPanel',
  components: { ButtonAdd },
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
    createEntryLocal() {
      this.addEntryDialog = false
      var entry = this.newEntry
      if (this.newEntry.timerEstimatedTime) {
        entry.timerEstimatedTime = this.newEntry.timerEstimatedTime
      }
      this.createEntry(entry)
      this.newEntry = {
        description: null,
        date: 'backlog',
        timerEstimatedTime: null,
      }
    },
    createTaskLocal() {
      this.addTaskDialog = false
      var task = this.newTask
      this.createTask(task)
      this.newTask = {
        description: null,
      }
    },
    getProgress(tracked, estimated) {
      return estimated !== 0 ? tracked / estimated : 0
    },
  },
  computed: {
    newEntryEstimatedTime: {
      get() {
        return this.secondsToTimestamp(this.newEntry.timerEstimatedTime, {
          zeroPad: true,
        })
      },
      set(val) {
        this.newEntry.timerEstimatedTime = this.timestampToSeconds(val)
      },
    },
    editedEntryTime: {
      get() {
        return this.secondsToTimestamp(this.editedEntry.timerTrackedTime, {
          zeroPad: true,
        })
      },
      set(val) {
        this.editedEntry.timerTrackedTime = this.timestampToSeconds(val)
      },
    },
    editedEstimatedTime: {
      get() {
        return this.secondsToTimestamp(this.editedEntry.timerEstimatedTime, {
          zeroPad: true,
        })
      },
      set(val) {
        this.editedEntry.timerEstimatedTime = this.timestampToSeconds(val)
      },
    },
  },
}
</script>