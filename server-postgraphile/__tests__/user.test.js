const { graphqlCall } = require('./commonApi')
const initData = require('./init.js')

let initVals
beforeAll(async () => {
  initData.clearDb()
  initVals = await initData.initialiseTests()
})
describe('categories', () => {
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
      }
      `,
      )
      expect(result.data.errors[0].message).toEqual(
        "No values were updated in collection 'categories' because no values you can update were found matching these criteria.",
      )
    })
  })
})
