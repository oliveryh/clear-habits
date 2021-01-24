import { graphqlCall } from './commonApi'

export const entry = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `query ($id: ID!) {
      entry(id: $id) {
        id
        description
        complete
        date
        timerActive
        timerTrackedTime
        timerEstimatedTime
        timerStartedAt
        task {
          id
          description
        }
      }
    }`,
  )

export const entries = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `query {
      entries {
        id
        description
        complete
        date
        timerActive
        timerTrackedTime
        timerEstimatedTime
        timerStartedAt
        date
        task {
          id
          description
          project {
            id
            color
            description
            category {
              id
              color
              description
            }
          }
        }
      }
    }`,
  )

export const entryCreate = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($taskId: ID!, $date: String, $timerEstimatedTime: Int, $description: String) {
      entryCreate(taskId: $taskId, date: $date, timerEstimatedTime: $timerEstimatedTime, description: $description) {
        id
        description
        complete
        date
        timerActive
        timerTrackedTime
        timerEstimatedTime
        timerStartedAt
        task {
          id
          description
        }
      }
    }`,
  )

export const entryUpdate = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($id: ID!, $taskId: ID, $complete: Boolean, $date: String, $timerTrackedTime: Int, $timerEstimatedTime: Int, $description: String) {
      entryUpdate(id: $id, taskId: $taskId, complete: $complete, date: $date, timerTrackedTime: $timerTrackedTime, timerEstimatedTime: $timerEstimatedTime, description: $description) {
        id
        description
        complete
        date
        timerActive
        timerTrackedTime
        timerEstimatedTime
        timerStartedAt
        task {
          id
          description
        }
      }
    }`,
  )

export const entryDelete = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($id: ID!) {
      entryDelete(id: $id)
    }`,
  )

export const entryComplete = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($id: ID!) {
      entryComplete(id: $id) {
        id
        description
        complete
        date
        timerActive
        timerTrackedTime
        timerEstimatedTime
        timerStartedAt
        task {
          id
          description
        }
      }
    }`,
  )

export const entryRestart = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($id: ID!) {
      entryRestart(id: $id) {
        id
        description
        complete
        date
        timerActive
        timerTrackedTime
        timerEstimatedTime
        timerStartedAt
        task {
          id
          description
        }
      }
    }`,
  )

export const entryStart = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($id: ID!) {
      entryStart(id: $id) {
        id
        description
        complete
        date
        timerActive
        timerTrackedTime
        timerEstimatedTime
        timerStartedAt
        task {
          id
          description
        }
      }
    }`,
  )

export const entryStop = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($id: ID!) {
      entryStop(id: $id) {
        id
        description
        complete
        date
        timerActive
        timerTrackedTime
        timerEstimatedTime
        timerStartedAt
        task {
          id
          description
        }
      }
    }`,
  )

export const entryCreateWithTask = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($projectId: ID!, $description: String!, $date: String, $timerEstimatedTime: Int) {
      entryCreateWithTask(projectId: $projectId, description: $description, date: $date, timerEstimatedTime: $timerEstimatedTime) {
        id
        description
        complete
        date
        timerActive
        timerTrackedTime
        timerEstimatedTime
        timerStartedAt
        task {
          id
          description
        }
      }
    }`,
  )
