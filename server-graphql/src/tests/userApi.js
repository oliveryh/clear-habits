import axios from 'axios'

const API_URL = 'http://localhost:8000/graphql'

export const user = async (variables) =>
  axios.post(API_URL, {
    query: `
        query ($id: ID!) {
            user(id: $id) {
                id
                username
                email
            }
        }
    `,
    variables,
  })

export const signIn = async (variables) =>
  axios.post(API_URL, {
    query: `
      mutation ($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
          token
        }
      }
    `,
    variables,
  })
