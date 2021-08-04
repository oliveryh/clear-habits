const { graphqlCall } = require('./commonApi')
const initData = require('./init.js')

const M_CATEGORY_CREATE = `
  mutation MyMutation($color: String = "", $description: String = "") {
    createCategory(input: {description: $description, color: $color}) {
      category {
        color
        colorContrast
        description
        personId
      }
    }
  }
`

const M_CATEGORY_UPDATE = `
  mutation MyMutation($description: String!, $id: Int!) {
    updateCategory(input: {patch: {description: $description}, id: $id}) {
      category {
        id
        description
      }
    }
  }
`

let initVals
beforeAll(async () => {
  initVals = await initData.initialiseTests()
})
describe('categories', () => {
  describe('createCategory', () => {
    it('success if correct Person ID', async () => {
      const result = await graphqlCall(
        {
          color: '#000',
          description: 'User 1 Category',
        },
        initVals.user1Token,
        M_CATEGORY_CREATE,
      )
      const expectedResult = {
        color: '#000',
        description: 'User 1 Category',
        colorContrast: false,
        personId: initVals.user1Id,
      }
      expect(result.data.data.createCategory.category).toEqual(expectedResult)
    })
    it('failure if color is malformed', async () => {
      const result = await graphqlCall(
        {
          color: 'red',
          description: 'User 1 Category',
        },
        initVals.user1Token,
        M_CATEGORY_CREATE,
      )
      expect(result.data.errors[0].message).toEqual(
        'new row for relation "categories" violates check constraint "color_hex_format"',
      )
    })
    it('failure if description is empty', async () => {
      const result = await graphqlCall(
        {
          color: '#000',
          description: '',
        },
        initVals.user1Token,
        M_CATEGORY_CREATE,
      )
      const expectedResult = {
        color: '#000',
        description: 'User 1 Category',
        colorContrast: false,
        personId: initVals.user1Id,
      }
      expect(result.data.errors[0].message).toEqual(
        'new row for relation "categories" violates check constraint "description_is_not_empty"',
      )
    })
  })
  describe('updateCategory', () => {
    it("failure if user tried editing category they don't own", async () => {
      const result = await graphqlCall(
        {
          id: initVals.user2Category1Id,
          description: 'New Category Description',
        },
        initVals.user1Token,
        M_CATEGORY_UPDATE,
      )
      expect(result.data.errors[0].message).toEqual(
        "No values were updated in collection 'categories' because no values you can update were found matching these criteria.",
      )
    })
    it('failure if description is empty', async () => {
      const result = await graphqlCall(
        {
          color: '#000',
          id: initVals.user1Category1Id,
          description: '',
        },
        initVals.user1Token,
        M_CATEGORY_UPDATE,
      )
      expect(result.data.errors[0].message).toEqual(
        'new row for relation "categories" violates check constraint "description_is_not_empty"',
      )
    })
    it('failure if updating person id to another user', async () => {
      const result = await graphqlCall(
        {
          id: initVals.user1Category1Id,
          personId: initVals.user2Id,
        },
        initVals.user1Token,
        `mutation MyMutation($id: Int!, $description: String, $personId: Int) {
          updateCategory(input: {patch: {description: $description, personId: $personId}, id: $id}) {
            category {
              id
              description
            }
          }
        }`,
      )
      expect(result.data.errors[0].message).toEqual(
        'Field "personId" is not defined by type "CategoryPatch".',
      )
    })
  })
})
