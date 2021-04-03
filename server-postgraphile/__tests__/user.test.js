const { graphqlCall } = require('./commonApi')

describe('api', () => {
  it('adds 1 + 2 to equal 3', async () => {
    const result = await graphqlCall(
      {},
      '',
      `query MyQuery {
        nodeId
      }
      `,
    )
    const expectedResult = {
      data: {
        nodeId: 'query',
      },
    }
    expect(result.data).toEqual(expectedResult)
  })
})
