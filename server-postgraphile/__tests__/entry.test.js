const { graphqlCall } = require('./commonApi')
const initData = require('./init.js')

let initVals
beforeAll(async () => {
  initVals = await initData.initialiseTests()
})
describe('entries', () => {
  describe('createEntry', () => {
    it('success if correct Person ID', async () => {
      const result = await graphqlCall(
        {
          description: 'User 1 Category 1 Task 1 Entry 2',
          taskId: initVals.user1Category1Project1Task1Id,
        },
        initVals.user1Token,
        `
        mutation MyMutation($taskId: Int!, $description: String!) {
          createEntry(input: {description: $description, taskId: $taskId}) {
            entry {
              description
              taskId
              personId
            }
          }
        }
        `,
      )
      const expectedResult = {
        description: 'User 1 Category 1 Task 1 Entry 2',
        taskId: initVals.user1Category1Project1Task1Id,
        personId: initVals.user1Id,
      }
      expect(result.data.data.createEntry.entry).toEqual(expectedResult)
    })
    it('failure if taskId not provided', async () => {
      const result = await graphqlCall(
        {
          description: 'User 1 Category 1 Task 1 Entry 3',
        },
        initVals.user1Token,
        `
        mutation MyMutation($taskId: Int, $description: String!) {
          createEntry(input: {description: $description, taskId: $taskId}) {
            entry {
              description
              taskId
              personId
            }
          }
        }
        `,
      )
      const expectedResult = {
        description: 'User 1 Category 1 Task 1 Entry 3',
        taskId: null,
        personId: initVals.user1Id,
      }
      expect(result.data.errors[0].message).toEqual(
        'null value in column "task_id" of relation \"entries\" violates not-null constraint',
      )
    })
    it('failure if taskId not owned by user', async () => {
      const result = await graphqlCall(
        {
          description: 'User 1 Category 1 Entry 2',
          taskId: initVals.user2Category1Project1Task1Id,
        },
        initVals.user1Token,
        `
        mutation MyMutation($taskId: Int!, $description: String!) {
          createEntry(input: {description: $description, taskId: $taskId}) {
            entry {
              description
              taskId
              personId
            }
          }
        }
        `,
      )

      expect(result.data.errors[0].message).toEqual(
        'new row for relation "entries" violates check constraint "person_owns_task"',
      )
    })
    it('failure if description is empty', async () => {
      const result = await graphqlCall(
        {
          taskId: initVals.user1Category1Project1Task1Id,
          description: '',
        },
        initVals.user1Token,
        `
        mutation MyMutation($taskId: Int!, $description: String!) {
          createEntry(input: {description: $description, taskId: $taskId}) {
            entry {
              description
              taskId
              personId
            }
          }
        }
        `,
      )
      expect(result.data.errors[0].message).toEqual(
        'new row for relation "entries" violates check constraint "description_is_not_empty"',
      )
    })
  })
  describe('updateEntry', () => {
    it("failure if user tried editing entry they don't own", async () => {
      const result = await graphqlCall(
        {
          id: initVals.user2Category1Project1Task1Entry1Id,
          description: 'New Entry Description',
        },
        initVals.user1Token,
        `
        mutation MyMutation($id: Int!, $description: String, $taskId: Int) {
          updateEntry(
            input: {patch: {description: $description, taskId: $taskId}, id: $id}
          ) {
            entry {
              description
              complete
              id
              taskId
              personId
            }
          }
        }
        `,
      )
      expect(result.data.errors[0].message).toEqual(
        "No values were updated in collection 'entries' because no values you can update were found matching these criteria.",
      )
    })

    it("failure if user tried updating to task they don't own", async () => {
      const result = await graphqlCall(
        {
          id: initVals.user1Category1Project1Task1Entry1Id,
          taskId: initVals.user2Category1Project1Task1Id,
        },
        initVals.user1Token,
        `
        mutation MyMutation($id: Int!, $description: String, $taskId: Int) {
          updateEntry(
            input: {patch: {description: $description, taskId: $taskId}, id: $id}
          ) {
            entry {
              description
              complete
              id
              taskId
              personId
            }
          }
        }
        `,
      )
      expect(result.data.errors[0].message).toEqual(
        'new row for relation "entries" violates check constraint "person_owns_task"',
      )
    })
    it('failure if description is empty', async () => {
      const result = await graphqlCall(
        {
          id: initVals.user1Category1Project1Task1Entry1Id,
          description: '',
        },
        initVals.user1Token,
        `
        mutation MyMutation($id: Int!, $description: String, $taskId: Int) {
          updateEntry(
            input: {patch: {description: $description, taskId: $taskId}, id: $id}
          ) {
            entry {
              description
              complete
              id
              taskId
              personId
            }
          }
        }
        `,
      )
      expect(result.data.errors[0].message).toEqual(
        'new row for relation "entries" violates check constraint "description_is_not_empty"',
      )
    })
  })
  describe('startEntry', () => {
    it('successfully start entry', async () => {
      const result = await graphqlCall(
        {
          id: initVals.user1Category1Project1Task5Entry1Id,
        },
        initVals.user1Token,
        `
        mutation MyMutation($id: Int!) {
          startEntry(input: {id: $id}) {
            entry {
              timerActive
              timerStartedAt
            }
          }
        }
        `,
      )
      const actualResult = result.data.data.startEntry.entry
      expect(actualResult.timerActive).toEqual(true)
      expect(actualResult.timerStartedAt).not.toEqual(null)
    })
    it('failure if id not owned by user', async () => {
      const result = await graphqlCall(
        {
          id: initVals.user2Category1Project1Task1Entry1Id,
        },
        initVals.user1Token,
        `
        mutation MyMutation($id: Int!) {
          startEntry(input: {id: $id}) {
            entry {
              timerActive
              timerStartedAt
            }
          }
        }
        `,
      )

      expect(result.data.errors[0].message).toEqual(
        'You do not have permission to update this entry',
      )
    })
  })
  describe('stopEntry', () => {
    it('successfully stop entry', async () => {
      const result = await graphqlCall(
        {
          id: initVals.user1Category1Project1Task6Entry1Id,
        },
        initVals.user1Token,
        `
        mutation MyMutation($id: Int!) {
          stopEntry(input: {id: $id}) {
            entry {
              timerActive
              timerStartedAt
              timerTrackedTime
            }
          }
        }
        `,
      )
      const actualResult = result.data.data.stopEntry.entry
      expect(actualResult.timerActive).toEqual(false)
      expect(actualResult.timerStartedAt).toEqual(null)
      expect(actualResult.timerTrackedTime).toEqual(3600)
    })
    it('failure if id not owned by user', async () => {
      const result = await graphqlCall(
        {
          id: initVals.user2Category1Project1Task1Entry1Id,
        },
        initVals.user1Token,
        `
        mutation MyMutation($id: Int!) {
          startEntry(input: {id: $id}) {
            entry {
              timerActive
              timerStartedAt
              timerTrackedTime
            }
          }
        }
        `,
      )

      expect(result.data.errors[0].message).toEqual(
        'You do not have permission to update this entry',
      )
    })
  })
  describe('completeEntry', () => {
    it('successfully complete entry', async () => {
      const result = await graphqlCall(
        {
          id: initVals.user1Category1Project1Task3Entry1Id,
        },
        initVals.user1Token,
        `
        mutation MyMutation($id: Int!) {
          completeEntry(input: {id: $id}) {
            entry {
              timerActive
              timerEstimatedTime
              timerTrackedTime
              timerStartedAt
              complete
              task {
                complete
              }
            }
          }
        }
        `,
      )
      const expectedResult = {
        timerActive: false,
        timerEstimatedTime: 0,
        timerStartedAt: null,
        timerTrackedTime: 0,
        complete: true,
        task: {
          complete: true,
        },
      }
      expect(result.data.data.completeEntry.entry).toEqual(expectedResult)
    })
    it('successfully complete entry and sets actual to estimated on new entry', async () => {
      const result = await graphqlCall(
        {
          id: initVals.user1Category1Project1Task2Entry1Id,
        },
        initVals.user1Token,
        `
        mutation MyMutation($id: Int!) {
          completeEntry(input: {id: $id}) {
            entry {
              timerActive
              timerEstimatedTime
              timerTrackedTime
              timerStartedAt
              complete
              task {
                complete
              }
            }
          }
        }
        `,
      )
      const expectedResult = {
        timerActive: false,
        timerEstimatedTime: 60,
        timerStartedAt: null,
        timerTrackedTime: 60,
        complete: true,
        task: {
          complete: true,
        },
      }
      expect(result.data.data.completeEntry.entry).toEqual(expectedResult)
    })
    it('failure if id not owned by user', async () => {
      const result = await graphqlCall(
        {
          id: initVals.user2Category1Project1Task1Entry1Id,
        },
        initVals.user1Token,
        `
        mutation MyMutation($id: Int!) {
          completeEntry(input: {id: $id}) {
            entry {
              timerActive
              timerEstimatedTime
              timerTrackedTime
              timerStartedAt
              complete
              task {
                complete
              }
            }
          }
        }
        `,
      )

      expect(result.data.errors[0].message).toEqual(
        'You do not have permission to update this entry',
      )
    })
  })
  describe('restartEntry', () => {
    it('successfully restart entry', async () => {
      const result = await graphqlCall(
        {
          id: initVals.user1Category1Project1Task6Entry1Id,
        },
        initVals.user1Token,
        `
        mutation MyMutation($id: Int!) {
          restartEntry(input: {id: $id}) {
            entry {
              complete
              task {
                complete
              }
            }
          }
        }
        `,
      )
      const expectedResult = {
        complete: false,
        task: {
          complete: false,
        },
      }
      expect(result.data.data.restartEntry.entry).toEqual(expectedResult)
    })

    it('failure if id not owned by user', async () => {
      const result = await graphqlCall(
        {
          id: initVals.user2Category1Project1Task1Entry1Id,
        },
        initVals.user1Token,
        `
        mutation MyMutation($id: Int!) {
          restartEntry(input: {id: $id}) {
            entry {
              complete
              task {
                complete
              }
            }
          }
        }
        `,
      )

      expect(result.data.errors[0].message).toEqual(
        'You do not have permission to update this entry',
      )
    })
  })
  describe('createEntryWithTask', () => {
    it('successfully create entry with task', async () => {
      const result = await graphqlCall(
        {
          description: 'Test Task',
          projectId: initVals.user1Category1Project1Id,
          timerEstimatedTime: 600,
        },
        initVals.user1Token,
        `
        mutation MyMutation($description: String!, $projectId: Int, $timerEstimatedTime: Int) {
          createEntryWithTask(input: {description: $description, projectId: $projectId, timerEstimatedTime: $timerEstimatedTime}) {
            entry {
              timerEstimatedTime
              task {
                complete
                description
                projectId
              }
            }
          }
        }
        `,
      )
      const expectedResult = {
        timerEstimatedTime: 600,
        task: {
          complete: false,
          description: 'Test Task',
          projectId: initVals.user1Category1Project1Id,
        },
      }
      expect(result.data.data.createEntryWithTask.entry).toEqual(expectedResult)
    })

    it('failure if project id not owned by user', async () => {
      const result = await graphqlCall(
        {
          description: 'Test Task',
          projectId: initVals.user2Category1Project1Id,
        },
        initVals.user1Token,
        `
        mutation MyMutation($description: String!, $projectId: Int, $timerEstimatedTime: Int) {
          createEntryWithTask(input: {description: $description, projectId: $projectId, timerEstimatedTime: $timerEstimatedTime}) {
            entry {
              timerEstimatedTime
              task {
                complete
                description
                projectId
              }
            }
          }
        }
        `,
      )
      const expectedResult = {
        task: {
          complete: false,
          description: 'Test Task',
          projectId: initVals.user1Category1Project1Id,
        },
      }
      expect(result.data.errors[0].message).toEqual(
        'new row for relation "tasks" violates check constraint "person_owns_project"',
      )
    })
  })
})
