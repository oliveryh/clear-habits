import { expect, assert } from 'chai'

import * as taskApi from './taskApi.js'
import * as userApi from './userApi.js'

const expectErrorMessage = (result, message) =>
  expect(result.data.errors[0].message).to.eql(message)

const expectErrorCode = (result, code) =>
  expect(result.data.errors[0].extensions.code).to.eql(code)

describe('tasks', () => {
  let token = 0
  let myTaskIdRetrieve = 1
  let myTaskIdUpdate = 2
  let myTaskIdDelete = 3
  let otherTaskId = 4
  let myProjectId = 1
  let otherProjectId = 4
  before(async () => {
    await userApi
      .signIn({
        login: 'oliver',
        password: 'alpineforest',
      })
      .then((result) => {
        token = { headers: { Authorization: result.data.data.signIn.token } }
      })
  })
  describe('task(id: ID!): Task!', () => {
    it('successfully returns a task', async () => {
      const result = await taskApi.task({
        variables: {
          id: myTaskIdRetrieve,
        },
        token,
      })
      const expectedResult = {
        data: {
          task: {
            id: myTaskIdRetrieve.toString(),
            description: 'User 1 Task 1',
            project: {
              description: 'User 1 Project 1',
              id: '1',
            },
          },
        },
      }
      expect(result.data).to.eql(expectedResult)
    })
    it('throws error if unauthenticated', async () => {
      const result = await taskApi.task({
        variables: {
          id: myTaskIdRetrieve,
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    it("throws error if you don't own the task", async () => {
      const result = await taskApi.task({
        variables: {
          id: otherTaskId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    it("throws error if task doesn't exist", async () => {
      const result = await taskApi.task({
        variables: {
          id: '0',
        },
        token,
      })
      expectErrorMessage(result, 'Task cannot be found')
      expectErrorCode(result, 'BAD_USER_INPUT')
    })
  })
  describe('tasks: [Task!]!', async () => {
    it('successfully returns tasks owned by authenticated user', async () => {
      const result = await taskApi.tasks({ token })
      expect(result.data.data.tasks.length).to.eql(5)
    })
    it('throws error if unauthenticated', async () => {
      const result = await taskApi.tasks({})
      expectErrorMessage(result, 'Not authenticated as user')
    })
  })
  describe('taskCreate(projectId: ID!, description: String!, color: String): Task', () => {
    // success
    it('successfully creates a task', async () => {
      const result = await taskApi.taskCreate({
        variables: {
          projectId: myProjectId,
          description: 'test',
        },
        token,
      })

      const expectedResult = {
        data: {
          taskCreate: {
            description: 'test',
          },
        },
      }

      expect(result.data).to.eql(expectedResult)
    })
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await taskApi.tasks({
        variables: {
          projectId: myProjectId,
          description: 'test',
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    // authorisation
    it("throws error if the projectId doesn't belong to user", async () => {
      const result = await taskApi.taskCreate({
        variables: {
          projectId: otherProjectId,
          description: 'Task 1',
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    // missing key
    it("throws error if the projectId doesn't exist", async () => {
      const result = await taskApi.taskCreate({
        variables: {
          projectId: 100,
          description: 'Task 1',
        },
        token,
      })
      expectErrorMessage(result, 'Project cannot be found')
    })
    // required attribute
    it('throws error if the projectId is empty', async () => {
      const result = await taskApi.taskCreate({
        variables: {
          description: 'Here is a new task',
        },
        token,
      })
      expectErrorMessage(
        result,
        'Variable "$projectId" of required type "ID!" was not provided.',
      )
    })
    // validation
    it('throws error if the description is empty', async () => {
      const result = await taskApi.taskCreate({
        variables: {
          projectId: myProjectId,
          description: '',
        },
        token,
      })
      expectErrorMessage(
        result,
        'Validation error: Task description cannot be empty',
      )
    })
  })
  describe('taskDelete(id: ID!): Boolean!', () => {
    // success
    it('successfully deletes a task', async () => {
      const result = await taskApi.taskDelete({
        variables: {
          id: myTaskIdDelete,
        },
        token,
      })
      expect(result.data.data.taskDelete).to.eql(true)
    })
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await taskApi.taskDelete({
        variables: {
          id: myTaskIdDelete,
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    // authorisation
    it("throws error if you don't own task", async () => {
      const result = await taskApi.taskDelete({
        variables: {
          id: otherTaskId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    // missing key
    it('throws error if task id not exist', async () => {
      const result = await taskApi.taskDelete({
        variables: {
          id: '100',
        },
        token,
      })
      expectErrorMessage(result, 'Task cannot be found')
    })
  })
  describe('taskUpdate(id: ID!, projectId: ID, description: String, color: String): Task', () => {
    // success
    it('successfully updates task if color formatted correctly', async () => {
      const result = await taskApi.taskUpdate({
        variables: {
          id: myTaskIdUpdate,
          description: 'New task description',
        },
        token,
      })
      const expectedResult = {
        data: {
          taskUpdate: {
            id: myTaskIdUpdate.toString(),
            description: 'New task description',
          },
        },
      }

      expect(result.data).to.eql(expectedResult)
    })
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await taskApi.taskUpdate({
        variables: {
          id: myTaskIdUpdate,
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    // authorisation
    it("throws error if you don't own the task (pk)", async () => {
      const result = await taskApi.taskUpdate({
        variables: {
          id: otherTaskId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    it("throws error if you don't own the project (fk)", async () => {
      const result = await taskApi.taskUpdate({
        variables: {
          id: myTaskIdUpdate,
          projectId: otherProjectId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    // missing key
    it("throws error if key doesn't exist for task (pk)", async () => {
      const result = await taskApi.taskUpdate({
        variables: {
          id: 100,
          projectId: myProjectId,
          description: 'New Task Name',
        },
        token,
      })
      expectErrorMessage(result, 'Task cannot be found')
    })
    it("throws error if key doesn't exist for project (fk)", async () => {
      const result = await taskApi.taskUpdate({
        variables: {
          id: myTaskIdRetrieve,
          projectId: 100,
          description: 'New Task Name',
        },
        token,
      })
      expectErrorMessage(result, 'Project cannot be found')
    })
    // required attribute
    it('throws error if the description is empty', async () => {
      const result = await taskApi.taskUpdate({
        variables: {
          id: myTaskIdRetrieve,
          projectId: myProjectId,
          description: '',
        },
        token,
      })
      expectErrorMessage(
        result,
        'Validation error: Task description cannot be empty',
      )
    })
  })
})
