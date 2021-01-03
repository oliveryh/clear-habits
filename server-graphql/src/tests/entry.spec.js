import { expect, assert } from 'chai'

import * as entryApi from './entryApi.js'
import * as userApi from './userApi.js'

const expectErrorMessage = (result, message) =>
  expect(result.data.errors[0].message).to.eql(message)

const expectErrorCode = (result, code) =>
  expect(result.data.errors[0].extensions.code).to.eql(code)

describe('entries', () => {
  let token = 0
  let myEntryIdRetrieve = 1
  let myEntryIdUpdate = 2
  let myEntryIdDelete = 3
  let myEntryIdEstimated = 4
  let myEntryIdRunning = 5
  let myEntryIdNewlyCreated = 6
  let myEntryIdRunning2 = 7
  let otherEntryId = 8
  let myTaskId = 1
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
  describe('entry(id: ID!): Entry!', () => {
    // success
    it('successfully returns an entry', async () => {
      const result = await entryApi.entry({
        variables: {
          id: myEntryIdRetrieve,
          timerEstimatedTime: 1000,
        },
        token,
      })
      const expectedResult = {
        data: {
          entry: {
            id: myEntryIdRetrieve.toString(),
            complete: false,
            date: '2020-01-01',
            timerActive: false,
            timerTrackedTime: 0,
            timerEstimatedTime: 0,
            timerStartedAt: null,
            task: {
              id: myTaskId.toString(),
              description: 'User 1 Task 1',
            },
          },
        },
      }
      expect(result.data).to.eql(expectedResult)
    })
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await entryApi.entry({
        variables: {
          id: myEntryIdRetrieve,
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    // authorisation
    it("throws error if you don't own the entry", async () => {
      const result = await entryApi.entry({
        variables: {
          id: otherEntryId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    // missing key
    it("throws error if entry doesn't exist", async () => {
      const result = await entryApi.entry({
        variables: {
          id: '0',
        },
        token,
      })
      expectErrorMessage(result, 'Entry cannot be found')
      expectErrorCode(result, 'BAD_USER_INPUT')
    })
  })
  describe('entries: [Entry!]!', async () => {
    // success
    it('successfully returns entries owned by authenticated user', async () => {
      const result = await entryApi.entries({ token })
      expect(result.data.data.entries.length).to.eql(7)
    })
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await entryApi.entries({})
      expectErrorMessage(result, 'Not authenticated as user')
    })
  })
  describe('entryCreate(taskId: ID!, timerEstimatedTime: Int): Entry!', () => {
    // success
    it('successfully creates an entry', async () => {
      const result = await entryApi.entryCreate({
        variables: {
          taskId: myTaskId,
          date: '2020-01-01',
          timerTrackedTime: 1000,
        },
        token,
      })

      const expectedResult = {
        data: {
          entryCreate: {
            date: '2020-01-01',
            complete: false,
            timerActive: false,
            timerTrackedTime: 0,
            timerEstimatedTime: 0,
            timerStartedAt: null,
            task: {
              id: myTaskId.toString(),
              description: 'User 1 Task 1',
            },
          },
        },
      }

      var actualResult = result.data
      delete actualResult.data.entryCreate.id
      expect(actualResult).to.eql(expectedResult)
    })

    it('successfully creates an entry with defaut values', async () => {
      const result = await entryApi.entryCreate({
        variables: {
          taskId: myTaskId,
        },
        token,
      })

      const expectedResult = {
        data: {
          entryCreate: {
            date: new Date().toISOString().substring(0, 10),
            complete: false,
            timerActive: false,
            timerTrackedTime: 0,
            timerEstimatedTime: 0,
            timerStartedAt: null,
            task: {
              id: myTaskId.toString(),
              description: 'User 1 Task 1',
            },
          },
        },
      }

      var actualResult = result.data
      delete actualResult.data.entryCreate.id
      expect(actualResult).to.eql(expectedResult)
    })
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await entryApi.entryCreate({
        variables: {
          taskId: myTaskId,
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    // authorisation
    it("throws error if the taskId doesn't belong to user", async () => {
      const result = await entryApi.entryCreate({
        variables: {
          taskId: otherTaskId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    // missing key
    it("throws error if the taskId doesn't exist", async () => {
      const result = await entryApi.entryCreate({
        variables: {
          taskId: 100,
        },
        token,
      })
      expectErrorMessage(result, 'Task cannot be found')
    })
    // required attribute
    it('throws error if the taskId is empty', async () => {
      const result = await entryApi.entryCreate({
        variables: {},
        token,
      })
      expectErrorMessage(
        result,
        'Variable "$taskId" of required type "ID!" was not provided.',
      )
    })
  })
  describe('entryCreateWithTask(projectId: ID!, description: String!, date: String, timerEstimatedTime: Int): Entry!', () => {
    // success
    it('successfully creates an entry', async () => {
      const result = await entryApi.entryCreateWithTask({
        variables: {
          projectId: myProjectId,
          description: 'User 1 Task 1',
          date: '2020-01-01',
          timerEstimatedTime: 100,
        },
        token,
      })

      const expectedResult = {
        data: {
          entryCreateWithTask: {
            date: '2020-01-01',
            complete: false,
            timerActive: false,
            timerTrackedTime: 0,
            timerEstimatedTime: 100,
            timerStartedAt: null,
            task: {
              description: 'User 1 Task 1',
            },
          },
        },
      }

      var actualResult = result.data
      delete actualResult.data.entryCreateWithTask.id
      delete actualResult.data.entryCreateWithTask.task.id
      expect(actualResult).to.eql(expectedResult)
    })

    it('successfully creates an entry with defaut values', async () => {
      const result = await entryApi.entryCreateWithTask({
        variables: {
          projectId: myProjectId,
          description: 'User 1 Task 1',
        },
        token,
      })

      const expectedResult = {
        data: {
          entryCreateWithTask: {
            date: new Date().toISOString().substring(0, 10),
            complete: false,
            timerActive: false,
            timerTrackedTime: 0,
            timerEstimatedTime: 0,
            timerStartedAt: null,
            task: {
              description: 'User 1 Task 1',
            },
          },
        },
      }

      var actualResult = result.data
      delete actualResult.data.entryCreateWithTask.id
      delete actualResult.data.entryCreateWithTask.task.id
      expect(actualResult).to.eql(expectedResult)
    })
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await entryApi.entryCreateWithTask({
        variables: {
          projectId: myProjectId,
          description: 'User 1 Task 1',
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    // authorisation
    it("throws error if the projectId doesn't belong to user", async () => {
      const result = await entryApi.entryCreateWithTask({
        variables: {
          projectId: otherProjectId,
          description: 'User 1 Task 1',
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    // missing key
    it("throws error if the projectId doesn't exist", async () => {
      const result = await entryApi.entryCreateWithTask({
        variables: {
          projectId: 100,
          description: 'User 1 Task 1',
        },
        token,
      })
      expectErrorMessage(result, 'Project cannot be found')
    })
    // required attribute
    it('throws error if the projectId is empty', async () => {
      const result = await entryApi.entryCreateWithTask({
        variables: {},
        token,
      })
      expectErrorMessage(
        result,
        'Variable "$projectId" of required type "ID!" was not provided.',
      )
    })
    it('throws error if the description is empty', async () => {
      const result = await entryApi.entryCreateWithTask({
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
  describe('entryDelete(id: ID!): Boolean!', () => {
    // success
    it('successfully deletes an entry', async () => {
      const result = await entryApi.entryDelete({
        variables: {
          id: myEntryIdDelete,
        },
        token,
      })
      expect(result.data.data.entryDelete).to.eql(true)
    })
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await entryApi.entryDelete({
        variables: {
          id: myEntryIdDelete,
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    // authorisation
    it("throws error if you don't own entry", async () => {
      const result = await entryApi.entryDelete({
        variables: {
          id: otherEntryId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    // missing key
    it('throws error if entry id not exist', async () => {
      const result = await entryApi.entryDelete({
        variables: {
          id: '100',
        },
        token,
      })
      expectErrorMessage(result, 'Entry cannot be found')
    })
  })
  describe('entryUpdate(id: ID!, taskId: ID, complete: Boolean, timerTrackedTime: Int, timerEstimatedTime: Int): Entry', () => {
    // success
    it('successfully updates entry', async () => {
      const result = await entryApi.entryUpdate({
        variables: {
          id: myEntryIdUpdate,
          complete: false,
          date: '2019-01-01',
          timerTrackedTime: 1000,
          timerEstimatedTime: 2000,
        },
        token,
      })
      const expectedResult = {
        data: {
          entryUpdate: {
            id: myEntryIdUpdate.toString(),
            complete: false,
            date: '2019-01-01',
            timerActive: false,
            timerTrackedTime: 1000,
            timerEstimatedTime: 2000,
            timerStartedAt: null,
            task: {
              id: myTaskId.toString(),
              description: 'User 1 Task 1',
            },
          },
        },
      }

      expect(result.data).to.eql(expectedResult)
    })
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await entryApi.entryUpdate({
        variables: {
          id: myEntryIdRetrieve,
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    // authorisation
    it("throws error if you don't own the entry (pk)", async () => {
      const result = await entryApi.entryUpdate({
        variables: {
          id: otherEntryId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    it("throws error if you don't own the project (fk)", async () => {
      const result = await entryApi.entryUpdate({
        variables: {
          id: myEntryIdRetrieve,
          taskId: otherTaskId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    // missing key
    it("throws error if key doesn't exist for entry (pk)", async () => {
      const result = await entryApi.entryUpdate({
        variables: {
          id: 100,
          taskId: myTaskId,
          complete: false,
        },
        token,
      })
      expectErrorMessage(result, 'Entry cannot be found')
    })
    it("throws error if key doesn't exist for project (fk)", async () => {
      const result = await entryApi.entryUpdate({
        variables: {
          id: myEntryIdRetrieve,
          taskId: 100,
          complete: false,
        },
        token,
      })
      expectErrorMessage(result, 'Task cannot be found')
    })
  }),
    describe('entryComplete(id: ID!): Entry', () => {
      // success
      it('successfully saves tracked time to estimated on completion', async () => {
        const result = await entryApi.entryComplete({
          variables: {
            id: myEntryIdEstimated,
          },
          token,
        })
        const expectedResult = {
          data: {
            entryComplete: {
              id: myEntryIdEstimated.toString(),
              complete: true,
              date: '2019-01-01',
              timerActive: false,
              timerTrackedTime: 100,
              timerEstimatedTime: 100,
              timerStartedAt: null,
              task: {
                id: myTaskId.toString(),
                description: 'User 1 Task 1',
              },
            },
          },
        }

        expect(result.data).to.eql(expectedResult)
      })
      it('successfully updates tracked time from running entry', async () => {
        const result = await entryApi.entryComplete({
          variables: {
            id: myEntryIdRunning,
          },
          token,
        })
        const expectedResult = {
          data: {
            entryComplete: {
              id: myEntryIdRunning.toString(),
              complete: true,
              date: '2019-01-01',
              timerActive: false,
              timerEstimatedTime: 100,
              timerStartedAt: null,
              task: {
                id: myTaskId.toString(),
                description: 'User 1 Task 1',
              },
            },
          },
        }

        expect(result.data.data.entryComplete.timerTrackedTime).to.be.at.least(
          1200,
        )
        var actualResult = result.data
        delete actualResult.data.entryComplete.timerTrackedTime
        expect(actualResult).to.eql(expectedResult)
      })
      // authentication
      it('throws error if unauthenticated', async () => {
        const result = await entryApi.entryComplete({
          variables: {
            id: myEntryIdRetrieve,
          },
        })
        expectErrorMessage(result, 'Not authenticated as user')
      })
      // authorisation
      it("throws error if you don't own the entry", async () => {
        const result = await entryApi.entryComplete({
          variables: {
            id: otherEntryId,
          },
          token,
        })
        expectErrorMessage(result, 'Not authorised to take this action')
      })
      // missing key
      it("throws error if entry doesn't exist", async () => {
        const result = await entryApi.entryComplete({
          variables: {
            id: '0',
          },
          token,
        })
        expectErrorMessage(result, 'Entry cannot be found')
        expectErrorCode(result, 'BAD_USER_INPUT')
      })
    })
  describe('entryStart(id: ID!): Entry', () => {
    // success
    it('successfully start entry', async () => {
      const result = await entryApi.entryStart({
        variables: {
          id: myEntryIdNewlyCreated,
        },
        token,
      })

      const actualData = result.data.data.entryStart
      expect(actualData.complete).to.eql(false)
      expect(actualData.timerActive).to.eql(true)
      expect(actualData.timerTrackedTime).to.eql(0)
      expect(actualData.timerStartedAt).to.not.eql(null)
    })
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await entryApi.entryStart({
        variables: {
          id: myEntryIdRetrieve,
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    // authorisation
    it("throws error if you don't own the entry", async () => {
      const result = await entryApi.entryStart({
        variables: {
          id: otherEntryId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    // missing key
    it("throws error if entry doesn't exist", async () => {
      const result = await entryApi.entryStart({
        variables: {
          id: '0',
        },
        token,
      })
      expectErrorMessage(result, 'Entry cannot be found')
      expectErrorCode(result, 'BAD_USER_INPUT')
    })
  }),
    describe('entryStop(id: ID!): Entry', () => {
      // success
      it('successfully stop entry', async () => {
        const result = await entryApi.entryStop({
          variables: {
            id: myEntryIdRunning2,
          },
          token,
        })

        const actualData = result.data.data.entryStop
        expect(actualData.complete).to.eql(false)
        expect(actualData.timerActive).to.eql(false)
        expect(actualData.timerTrackedTime).to.be.at.least(1200)
        expect(actualData.timerStartedAt).to.eql(null)
      })
      // authentication
      it('throws error if unauthenticated', async () => {
        const result = await entryApi.entryStop({
          variables: {
            id: myEntryIdRetrieve,
          },
        })
        expectErrorMessage(result, 'Not authenticated as user')
      })
      // authorisation
      it("throws error if you don't own the entry", async () => {
        const result = await entryApi.entryStop({
          variables: {
            id: otherEntryId,
          },
          token,
        })
        expectErrorMessage(result, 'Not authorised to take this action')
      })
      // missing key
      it("throws error if entry doesn't exist", async () => {
        const result = await entryApi.entryStop({
          variables: {
            id: '0',
          },
          token,
        })
        expectErrorMessage(result, 'Entry cannot be found')
        expectErrorCode(result, 'BAD_USER_INPUT')
      })
    })
})
