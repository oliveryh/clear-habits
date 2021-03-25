import axios from 'axios'

const API_URL = 'http://localhost:8000/graphql'

export const graphqlCall = async (variables, token, query) => {
  return axios
    .post(
      API_URL,
      {
        query,
        variables,
      },
      token,
    )
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error.response
    })
}
