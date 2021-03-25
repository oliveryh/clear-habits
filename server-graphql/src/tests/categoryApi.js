import { graphqlCall } from './commonApi'

export const category = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `query ($id: ID!) {
      category(id: $id) {
        id
        description
        user {
          username
        }
        color
      }
    }`,
  )

export const categories = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `query {
      categories {
        id
      }
    }`,
  )

export const categoryCreate = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($description: String!, $color: String) {
      categoryCreate(description: $description, color: $color) {
        description
        color
      }
    }`,
  )

export const categoryUpdate = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($id: ID!, $description: String, $color: String) {
      categoryUpdate(id: $id, description: $description, color: $color) {
        id
        description
        color
      }
    }`,
  )

export const categoryDelete = ({ variables, token }) =>
  graphqlCall(
    variables,
    token,
    `mutation ($id: ID!) {
      categoryDelete(id: $id)
    }`,
  )
