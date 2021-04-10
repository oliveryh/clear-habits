const { graphqlCall } = require('./commonApi')
const { Client } = require('pg')

const clearDb = async () => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'clearhabits_postgraphile',
    password: 'postgres',
    port: 5432,
  })
  client.connect()
  client.query('DELETE FROM app_public.person', (err, res) => {
    client.end()
  })
}

const initialiseTests = async () => {
  const user1 = await graphqlCall(
    {
      email: 'hello@alpine.com',
      password: 'alpineforest',
      username: 'alpine',
    },
    '',
    `
    mutation MyMutation($email: String!, $password: String!, $username: String!) {
        signUp(input: {username: $username, email: $email, password: $password}) {
            clientMutationId
            jwtToken
        }
    }`,
  )
  const user1Token = {
    headers: { Authorization: 'Bearer ' + user1.data.data.signUp.jwtToken },
  }

  const me = await graphqlCall(
    {},
    user1Token,
    `
    query MyQuery {
      me {
        id
      }
    }
    `,
  )

  const user1Id = me.data.data.me.id

  const user2 = await graphqlCall(
    {
      email: 'hello@banana.com',
      password: 'bananforest',
      username: 'banana',
    },
    '',
    `
    mutation MyMutation($email: String!, $password: String!, $username: String!) {
        signUp(input: {username: $username, email: $email, password: $password}) {
            clientMutationId
            jwtToken
        }
    }`,
  )

  const user2Token = {
    headers: { Authorization: 'Bearer ' + user2.data.data.signUp.jwtToken },
  }

  const me2 = await graphqlCall(
    {},
    user2Token,
    `
    query MyQuery {
      me {
        id
      }
    }
    `,
  )

  const user2Id = me2.data.data.me.id

  const user1Category1 = await graphqlCall(
    {
      color: '#000',
      description: 'User 1 Category 1',
    },
    user1Token,
    `
    mutation MyMutation($color: String!, $description: String!) {
        createCategory(input: {color: $color, description: $description}) {
            category {
                id
                color
                colorContrast
                description
                personId
            }
        }
    }
    `,
  )
  const user1Category1Id = user1Category1.data.data.createCategory.category.id

  const user2Category1 = await graphqlCall(
    {
      color: '#FFFFFF',
      description: 'User 2 Category 1',
    },
    user2Token,
    `
    mutation MyMutation($color: String!, $description: String!) {
        createCategory(input: {color: $color, description: $description}) {
            category {
                id
                color
                colorContrast
                description
                personId
            }
        }
    }
    `,
  )
  const user2Category1Id = user2Category1.data.data.createCategory.category.id

  const user1Category1Project1 = await graphqlCall(
    {
      description: 'User 1 Category 1 Task 1',
      categoryId: user1Category1Id,
    },
    user1Token,
    `
    mutation MyMutation($categoryId: Int!, $description: String!) {
      createProject(input: {description: $description, categoryId: $categoryId}) {
        project {
          id
          description
          categoryId
          personId
        }
      }
    }
    `,
  )

  const user1Category1Project1Id =
    user1Category1Project1.data.data.createProject.project.id

  const user2Category1Project1 = await graphqlCall(
    {
      description: 'User 1 Category 1 Task 1',
      categoryId: user2Category1Id,
    },
    user2Token,
    `
    mutation MyMutation($categoryId: Int!, $description: String!) {
      createProject(input: {description: $description, categoryId: $categoryId}) {
        project {
          id
          description
          categoryId
          personId
        }
      }
    }
    `,
  )

  const user2Category1Project1Id =
    user2Category1Project1.data.data.createProject.project.id

  return {
    user1Token,
    user1Id,
    user1Category1Id,
    user1Category1Project1Id,
    user2Token,
    user2Id,
    user2Category1Id,
    user2Category1Project1Id,
  }
}

module.exports = { clearDb, initialiseTests }
