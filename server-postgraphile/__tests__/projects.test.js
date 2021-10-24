const { graphqlCall } = require('./commonApi')
const initData = require('./init.js')

const M_PROJECT_CREATE = `
  mutation MyMutation($categoryId: Int!, $description: String!) {
    createProject(input: {description: $description, categoryId: $categoryId}) {
      project {
        description
        categoryId
        personId
      }
    }
  }
`

const M_PROJECT_UPDATE = `
  mutation MyMutation($id: Int!, $description: String, $categoryId: Int) {
    updateProject(
      input: {patch: {description: $description, categoryId: $categoryId}, id: $id}
    ) {
      project {
        description
        id
        personId
        categoryId
      }
    }
  }
`

let initVals
beforeAll(async () => {
  initVals = await initData.initialiseTests()
})
describe('projects', () => {
  describe('createProject', () => {
    it('success if correct Person ID', async () => {
      const result = await graphqlCall(
        {
          description: 'User 1 Category 1 Project 2',
          categoryId: initVals.user1Category1Id,
        },
        initVals.user1Token,
        M_PROJECT_CREATE,
      )
      const expectedResult = {
        description: 'User 1 Category 1 Project 2',
        categoryId: initVals.user1Category1Id,
        personId: initVals.user1Id,
      }
      expect(result.data.data.createProject.project).toEqual(expectedResult)
    })
    it('failure if categoryId not owned by user', async () => {
      const result = await graphqlCall(
        {
          description: 'User 1 Category 1 Project 2',
          categoryId: initVals.user2Category1Id,
        },
        initVals.user1Token,
        M_PROJECT_CREATE,
      )

      expect(result.data.errors[0].message).toEqual(
        'new row for relation "projects" violates check constraint "person_owns_category"',
      )
    })
    it('failure if description is empty', async () => {
      const result = await graphqlCall(
        {
          categoryId: initVals.user1Category1Id,
          description: '',
        },
        initVals.user1Token,
        M_PROJECT_CREATE,
      )
      expect(result.data.errors[0].message).toEqual(
        'new row for relation "projects" violates check constraint "description_is_not_empty"',
      )
    })
  })
  describe('updateCategory', () => {
    it("failure if user tried editing project they don't own", async () => {
      const result = await graphqlCall(
        {
          id: initVals.user2Category1Project1Id,
          description: 'New Category Description',
        },
        initVals.user1Token,
        M_PROJECT_UPDATE,
      )
      expect(result.data.errors[0].message).toEqual(
        "No values were updated in collection 'projects' because no values you can update were found matching these criteria.",
      )
    })

    it("failure if user tried updating to category they don't own", async () => {
      const result = await graphqlCall(
        {
          id: initVals.user1Category1Project1Id,
          categoryId: initVals.user2Category1Id,
        },
        initVals.user1Token,
        M_PROJECT_UPDATE,
      )
      expect(result.data.errors[0].message).toEqual(
        'new row for relation "projects" violates check constraint "person_owns_category"',
      )
    })
    it('failure if description is empty', async () => {
      const result = await graphqlCall(
        {
          id: initVals.user1Category1Project1Id,
          description: '',
        },
        initVals.user1Token,
        M_PROJECT_UPDATE,
      )
      expect(result.data.errors[0].message).toEqual(
        'new row for relation "projects" violates check constraint "description_is_not_empty"',
      )
    })
  })
})
