import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Entry from '../components/Entry.vue'
import SettingsPanel from '../components/SettingsPanel.vue'

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
