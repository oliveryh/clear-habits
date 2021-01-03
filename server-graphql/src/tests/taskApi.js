import { graphqlCall } from './commonApi'

export const task = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `query ($id: ID!) {
      task(id: $id) {
        id
        description
        project {
          id
          description
        }
      }
    }`,
  )

export const tasks = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `query {
      tasks {
        id
      }
    }`,
  )

export const taskCreate = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($projectId: ID!, $description: String!) {
      taskCreate(projectId: $projectId, description: $description) {
        description
      }
    }`,
  )

export const taskUpdate = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($id: ID!, $projectId: ID, $description: String) {
      taskUpdate(id: $id, projectId: $projectId, description: $description) {
        id
        description
      }
    }`,
  )

export const taskDelete = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($id: ID!) {
      taskDelete(id: $id)
    }`,
  )
