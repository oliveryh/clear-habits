<template>
  <div>
    <div class="row">
      <div class="col q-pa-lg">
        <planner-panel :v-if="planner != []" :planner="planner" />
      </div>
    </div>
  </div>
</template>
<script>
import { Q_PLANNER } from '@/graphql/queries'
import PlannerPanel from '../components/PlannerPanel.vue'

export default {
  components: { PlannerPanel },
  name: 'Planner',
  apollo: {
    planner: {
      query: Q_PLANNER,
      update(data) {
        console.log('update called')
        const processNode = (node) => {
          let childTypes = ['projects', 'tasks', 'entries']

          childTypes.forEach((childType) => {
            if (childType in node) {
              if (childType == 'tasks') {
                node[childType] = node[childType].filter(
                  (task) => task.complete === false,
                )
              }
              if (
                childType == 'projects' ||
                childType == 'tasks' ||
                childType == 'entries'
              ) {
                node[childType].forEach((child) => {
                  processNode(child)
                })
              }
              node['children'] = node[childType]
              delete node[childType]
            }
          })
          // Add counter for number of open tasks
          var numTasks = 0
          if (node.__typename == 'Project') {
            if ('children' in node) {
              node['children'].forEach((child) => {
                if (!child.complete) {
                  numTasks += 1
                }
              })
            }
            node.numTasks = numTasks
          } else if (node.__typename == 'Category') {
            if ('children' in node) {
              node['children'].forEach((child) => {
                numTasks += child.numTasks
              })
            }

            node.numTasks = numTasks
          }
          // Add timer tracked and estimated time progress bar
          if (node.__typename == 'Task') {
            var totalTimerEstimatedTime = 0
            var totalTimerTrackedTime = 0
            if ('children' in node) {
              node['children'].forEach((child) => {
                totalTimerEstimatedTime += child.timerEstimatedTime
                totalTimerTrackedTime += child.timerTrackedTime
              })
              // Sort entries by completion and date
              node['children'].sort((a, b) => (a.date > b.date ? 1 : -1))
              node['children'].sort((a, b) =>
                a.complete > b.complete ? 1 : -1,
              )
            }
            node.totalTimerEstimatedTime = totalTimerEstimatedTime
            node.totalTimerTrackedTime = totalTimerTrackedTime
          }
          node.header = node.__typename.toLowerCase()
          node.body = node.__typename.toLowerCase()
          node.nodeId = node.__typename + node.id
        }

        data.categories.forEach((category) => {
          processNode(category)
        })
        return data.categories
      },
    },
  },
  methods: {},
}
</script>