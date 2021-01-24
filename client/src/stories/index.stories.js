import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Entry from '../components/Entry.vue'
import SettingsPanel from '../components/SettingsPanel.vue'
import PlannerPanel from '../components/PlannerPanel.vue'

export default {
  title: 'Button',
}

export const withEntry = () => ({
  components: { Entry },
  data() {
    return {
      entryObject: {
        id: 1,
        complete: false,
        date: '2020-01-01',
        timerActive: false,
        timerTrackedTime: 0,
        timerEstimatedTime: 60,
        timerStartedAt: null,
        task: {
          id: 2,
          description: 'User 1 Task 1',
        },
      },
    }
  },
  template: '<entry :entry="entryObject" />',
})

export const withTimerStarted = () => ({
  components: { Entry },
  data() {
    return {
      entryObject: {
        id: 1,
        complete: false,
        date: '2020-01-01',
        timerActive: true,
        timerTrackedTime: 0,
        timerEstimatedTime: 60,
        timerStartedAt: Date.now() - 5,
        task: {
          id: 2,
          description: 'User 1 Task 1',
          project: {
            description: 'Project Title',
            category: {
              color: '#8F4',
              description: 'Category Title',
            },
          },
        },
      },
    }
  },
  template: '<entry :entry="entryObject" />',
})

export const inProgress = () => ({
  components: { Entry },
  data() {
    return {
      entryObject: {
        id: 1,
        complete: true,
        date: '2020-01-01',
        timerActive: false,
        timerTrackedTime: 30,
        timerEstimatedTime: 60,
        timerStartedAt: null,
        task: {
          id: 2,
          description: 'User 1 Task 1',
          project: {
            description: 'Project Title',
            category: {
              color: '#000',
              description: 'Category Title',
            },
          },
        },
      },
    }
  },
  template: '<entry :entry="entryObject" />',
})

export const Settings = () => ({
  components: { SettingsPanel },
  data() {
    return {
      categories: [
        {
          id: 1,
          color: '#F00',
          description: 'Category 1',
          projects: [
            {
              id: 2,
              description: 'Project 2',
            },
          ],
        },
      ],
    }
  },
  template: '<settings-panel :categories="categories"/>',
})

export const PlannerPanelBasic = () => ({
  components: { PlannerPanel },
  data() {
    return {
      planner: [
        {
          id: 1,
          __typename: 'Category',
          body: 'category',
          // header: 'category',
          nodeId: 'C1',
          color: '#F00',
          description: 'Category 1',
          children: [
            {
              id: 2,
              __typename: 'Project',
              body: 'project',
              header: 'project',
              nodeId: 'P2',
              description: 'Project 2',
              children: [
                {
                  id: 1,
                  __typename: 'Task',
                  body: 'task',
                  header: 'task',
                  nodeId: 'T1',
                  description: 'Task 1 (Not entries)',
                  complete: false,
                  children: [],
                },
                {
                  id: 2,
                  __typename: 'Task',
                  body: 'task',
                  header: 'task',
                  nodeId: 'T2',
                  description: 'Task 2 (1 Entry no description)',
                  complete: false,
                  children: [
                    {
                      id: 1,
                      __typename: 'Entry',
                      body: 'entry',
                      header: 'entry',
                      nodeId: 'E1',
                      description: 'apple',
                      complete: true,
                      date: '2020-01-01',
                      timerActive: false,
                      timerTrackedTime: 30,
                      timerEstimatedTime: 60,
                      timerStartedAt: null,
                    },
                  ],
                },
                {
                  id: 3,
                  __typename: 'Task',
                  body: 'task',
                  header: 'task',
                  nodeId: 'T3',
                  description: 'Task 3 (Multiple entries and descriptions)',
                  complete: false,
                  children: [
                    {
                      id: 2,
                      __typename: 'Entry',
                      body: 'entry',
                      header: 'entry',
                      nodeId: 'E2',
                      description: 'Entry Complete',
                      complete: true,
                      date: '2020-01-01',
                      timerActive: false,
                      timerTrackedTime: 30,
                      timerEstimatedTime: 60,
                      timerStartedAt: null,
                    },
                    {
                      id: 3,
                      __typename: 'Entry',
                      body: 'entry',
                      header: 'entry',
                      nodeId: 'E3',
                      description: 'Entry In Progress',
                      complete: false,
                      date: '2020-01-01',
                      timerActive: true,
                      timerTrackedTime: 0,
                      timerEstimatedTime: 60,
                      timerStartedAt: Date.now() - 5,
                    },
                    {
                      id: 4,
                      __typename: 'Entry',
                      body: 'entry',
                      header: 'entry',
                      nodeId: 'E4',
                      description: 'Entry To Do',
                      complete: false,
                      date: '2020-01-01',
                      timerActive: false,
                      timerTrackedTime: 30,
                      timerEstimatedTime: 60,
                      timerStartedAt: null,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }
  },
  template: '<planner-panel :planner="planner"/>',
})
