const { graphqlCall } = require('./commonApi')
const { Client } = require('pg')
var fs = require('fs')

const initialiseTests = async () => {
  var sql = fs.readFileSync('__tests__/seed.sql').toString()

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'clearhabits_postgraphile',
    password: 'postgres',
    port: 5432,
  })

  client.connect()

  client.query(sql, function (err, result) {
    if (err) {
      console.log('Error: ', err)
      process.exit(1)
    }
  })

  const getUserToken = (args) =>
    graphqlCall(
      args,
      '',
      `
    mutation MyMutation($email: String!, $password: String!) {
        signIn(input: {email: $email, password: $password}) {
            clientMutationId
            jwtToken
        }
    }`,
    ).then((result) => {
      return {
        headers: {
          Authorization: 'Bearer ' + result.data.data.signIn.jwtToken,
        },
      }
    })

  const user1Token = await getUserToken({
    email: 'hello@user1.com',
    password: 'password',
  })

  const user2Token = await getUserToken({
    email: 'hello@user2.com',
    password: 'password',
  })

  return {
    user1Token,
    user1Id: 2,
    user1Category1Id: 2,
    user1Category1Project1Id: 2,
    user1Category1Project1Task1Id: 2,
    user1Category1Project1Task1Entry1Id: 2,
    user1Category1Project1Task2Entry1Id: 3,
    user1Category1Project1Task3Entry1Id: 4,
    user1Category1Project1Task4Entry1Id: 5,
    user1Category1Project1Task5Entry1Id: 6,
    user1Category1Project1Task6Entry1Id: 7,
    user2Token,
    user2Id: 1,
    user2Category1Id: 1,
    user2Category1Project1Id: 1,
    user2Category1Project1Task1Id: 1,
    user2Category1Project1Task1Entry1Id: 1,
  }
}

module.exports = { initialiseTests }
