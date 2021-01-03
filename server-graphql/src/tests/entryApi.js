import { graphqlCall } from './commonApi'

export const entry = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `query ($id: ID!) {
      entry(id: $id) {
        id
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
      }
    }`,
  )

export const entryCreate = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($taskId: ID!, $date: String, $timerEstimatedTime: Int) {
      entryCreate(taskId: $taskId, date: $date, timerEstimatedTime: $timerEstimatedTime) {
        id
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
    `mutation ($id: ID!, $taskId: ID, $complete: Boolean, $date: String, $timerTrackedTime: Int, $timerEstimatedTime: Int) {
      entryUpdate(id: $id, taskId: $taskId, complete: $complete, date: $date, timerTrackedTime: $timerTrackedTime, timerEstimatedTime: $timerEstimatedTime) {
        id
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
