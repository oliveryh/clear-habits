import gql from 'graphql-tag'

export const F_TASK_ENTRIES = gql`
  fragment EntryList on Task {
    entries {
      id
    }
  }
`

export const F_PROJECT_TASKS = gql`
  fragment TaskList on Project {
    tasks {
      id
    }
  }
`

export const F_CATEGORY_PROJECTS = gql`
  fragment ProjectList on Category {
    projects {
      id
    }
  }
`

export const F_PROJECT = gql`
  fragment Project on Project {
    id
    description
  }
`
export const F_CATEGORY = gql`
  fragment Category on Category {
    id
    color
    description
  }
`

export const F_TASK = gql`
  fragment Task on Task {
    id
    complete
    description
  }
`

export const F_ENTRY = gql`
  fragment Entry on Entry {
    id
    description
    listOrder
    complete
    timerActive
    timerTrackedTime
    timerEstimatedTime
    timerStartedAt
  }
`
