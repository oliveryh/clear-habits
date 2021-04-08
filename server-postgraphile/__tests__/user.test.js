const { graphqlCall } = require('./commonApi')
const initData = require('./init.js')

let initVals
beforeAll(async () => {
  initData.clearDb()
  initVals = await initData.initialiseTests()
})
describe('categories', () => {
  describe('createCategory', () => {
    it('creates a category with the correct Person ID', async () => {
      const result = await graphqlCall(
        {
          color: '#000',
          description: 'User 1 Category',
        },
        initVals.user1Token,
        `mutation MyMutation($color: String = "", $description: String = "") {
          createCategory(input: {description: $description, color: $color}) {
            category {
              color
              colorContrast
              description
              personId
            }
          }
        }`,
      )
      const expectedResult = {
        color: '#000',
        description: 'User 1 Category',
        colorContrast: false,
        personId: initVals.user1Id,
      }
      expect(result.data.data.createCategory.category).toEqual(expectedResult)
    })
    it('fails if color is malformed', async () => {
      const result = await graphqlCall(
        {
          color: 'red',
          description: 'User 1 Category',
        },
        initVals.user1Token,
        `mutation MyMutation($color: String = "", $description: String = "") {
          createCategory(input: {description: $description, color: $color}) {
            category {
              color
              colorContrast
              description
              personId
            }
          }
        }`,
      )
      expect(result.data.errors[0].message).toEqual(
        'new row for relation "categories" violates check constraint "color_hex_format"',
      )
    })
    it('fails if description is empty', async () => {
      const result = await graphqlCall(
        {
          color: '#000',
          description: '',
        },
        initVals.user1Token,
        `mutation MyMutation($color: String = "", $description: String = "") {
          createCategory(input: {description: $description, color: $color}) {
            category {
              color
              colorContrast
              description
              personId
            }
          }
        }`,
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
    it("error if user tried editing category they don't own", async () => {
      const result = await graphqlCall(
        {
          id: initVals.user2Category1Id,
          description: 'New Category Description',
        },
        initVals.user1Token,
        `mutation MyMutation($description: String!, $id: Int!) {
          updateCategory(input: {patch: {description: $description}, id: $id}) {
            category {
              id
              description
            }
          }
        }`,
      )
      expect(result.data.errors[0].message).toEqual(
        "No values were updated in collection 'categories' because no values you can update were found matching these criteria.",
      )
    })
    it('fails if description is empty', async () => {
      const result = await graphqlCall(
        {
          color: '#000',
          id: initVals.user1Category1Id,
          description: '',
        },
        initVals.user1Token,
        `mutation MyMutation($description: String!, $id: Int!) {
          updateCategory(input: {patch: {description: $description}, id: $id}) {
            category {
              id
              description
            }
          }
        }`,
      )
      expect(result.data.errors[0].message).toEqual(
        'new row for relation "categories" violates check constraint "description_is_not_empty"',
      )
    })
  })
})
