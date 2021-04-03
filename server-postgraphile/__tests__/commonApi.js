const axios = require('axios')

const API_URL = 'http://localhost:3000/graphql'

const graphqlCall = async (variables, token, query) => {
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

module.exports = { graphqlCall }
