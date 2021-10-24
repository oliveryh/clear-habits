const { graphqlCall } = require('./commonApi')
const initData = require('./init.js')

const M_TASK_CREATE = `
  mutation MyMutation($projectId: Int!, $description: String!) {
    createTask(input: {description: $description, projectId: $projectId}) {
      task {
        description
        projectId
        personId
      }
    }
  }
`
const M_TASK_UPDATE = `
  mutation MyMutation($id: Int!, $description: String, $projectId: Int, $personId: Int) {
    updateTask(
      input: {patch: {description: $description, projectId: $projectId, personId: $personId}, id: $id}
    ) {
      task {
        description
        complete
        id
        projectId
        personId
      }
    }
  }
`

let initVals
beforeAll(async () => {
  initVals = await initData.initialiseTests()
})
describe('tasks', () => {
  describe('createTask', () => {
    it('success if correct Person ID', async () => {
      const result = await graphqlCall(
        {
          description: 'User 1 Category 1 Project 1 Task 2',
          projectId: initVals.user1Category1Project1Id,
        },
        initVals.user1Token,
        M_TASK_CREATE,
      )
      const expectedResult = {
        description: 'User 1 Category 1 Project 1 Task 2',
        projectId: initVals.user1Category1Project1Id,
        personId: initVals.user1Id,
      }
      expect(result.data.data.createTask.task).toEqual(expectedResult)
    })
    it('failure if projectId not owned by user', async () => {
      const result = await graphqlCall(
        {
          description: 'User 1 Category 1 Task 2',
          projectId: initVals.user2Category1Project1Id,
        },
        initVals.user1Token,
        M_TASK_CREATE,
      )

      expect(result.data.errors[0].message).toEqual(
        'new row for relation "tasks" violates check constraint "person_owns_project"',
      )
    })
    it('failure if description is empty', async () => {
      const result = await graphqlCall(
        {
          projectId: initVals.user1Category1Project1Id,
          description: '',
        },
        initVals.user1Token,
        M_TASK_CREATE,
      )
      expect(result.data.errors[0].message).toEqual(
        'new row for relation "tasks" violates check constraint "description_is_not_empty"',
      )
    })
  })
  describe('updateCategory', () => {
    it("failure if user tried editing task they don't own", async () => {
      const result = await graphqlCall(
        {
          id: initVals.user2Category1Project1Task1Id,
          description: 'New Task Description',
        },
        initVals.user1Token,
        M_TASK_UPDATE,
      )
      expect(result.data.errors[0].message).toEqual(
        "No values were updated in collection 'tasks' because no values you can update were found matching these criteria.",
      )
    })

    it("failure if user tried updating to project they don't own", async () => {
      const result = await graphqlCall(
        {
          id: initVals.user1Category1Project1Task1Id,
          projectId: initVals.user2Category1Project1Id,
        },
        initVals.user1Token,
        M_TASK_UPDATE,
      )
      expect(result.data.errors[0].message).toEqual(
        'new row for relation "tasks" violates check constraint "person_owns_project"',
      )
    })
    it('failure if description is empty', async () => {
      const result = await graphqlCall(
        {
          id: initVals.user1Category1Project1Task1Id,
          description: '',
        },
        initVals.user1Token,
        M_TASK_UPDATE,
      )
      expect(result.data.errors[0].message).toEqual(
        'new row for relation "tasks" violates check constraint "description_is_not_empty"',
      )
    })
    it('failure if updating person id to another user', async () => {
      const result = await graphqlCall(
        {
          id: initVals.user1Category1Project1Task1Id,
          personId: initVals.user2Id,
        },
        initVals.user1Token,
        M_TASK_UPDATE,
      )

      expect(result.data.errors[0].message).toEqual(
        'new row violates row-level security policy for table "tasks"',
      )
    })
  })
})
