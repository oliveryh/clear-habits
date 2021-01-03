import { graphqlCall } from './commonApi'

export const project = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `query ($id: ID!) {
      project(id: $id) {
        id
        description
        user {
          username
        }
        category {
          id
          description
        }
        color
      }
    }`,
  )

export const projects = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `query {
      projects {
        id
      }
    }`,
  )

export const projectCreate = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($categoryId: ID!, $description: String!, $color: String) {
      projectCreate(categoryId: $categoryId, description: $description, color: $color) {
        description
        color
      }
    }`,
  )

export const projectUpdate = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($id: ID!, $categoryId: ID, $description: String, $color: String) {
      projectUpdate(categoryId: $categoryId, id: $id, description: $description, color: $color) {
        id
        description
        color
      }
    }`,
  )

export const projectDelete = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($id: ID!) {
      projectDelete(id: $id)
    }`,
  )
