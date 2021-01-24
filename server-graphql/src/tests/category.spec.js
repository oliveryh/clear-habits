import { expect, assert } from 'chai'

import * as categoryApi from './categoryApi.js'
import * as userApi from './userApi.js'

const expectErrorMessage = (result, message) =>
  expect(result.data.errors[0].message).to.eql(message)

const expectErrorCode = (result, code) =>
  expect(result.data.errors[0].extensions.code).to.eql(code)

describe('categories', () => {
  let token = 0
  let myCategoryIdRetrieve = 1
  let myCategoryIdUpdate = 2
  let myCategoryIdDelete = 3
  let otherCategoryId = 4
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
  describe('category(id: ID!): Category!', () => {
    // success
    it('successfully returns a category', async () => {
      const result = await categoryApi.category({
        variables: {
          id: myCategoryIdRetrieve,
        },
        token,
      })
      const expectedResult = {
        data: {
          category: {
            id: myCategoryIdRetrieve.toString(),
            description: 'User 1 Category 1',
            user: {
              username: 'oliver',
            },
            color: '#fff',
          },
        },
      }
      expect(result.data).to.eql(expectedResult)
    })
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await categoryApi.category({
        variables: {
          id: myCategoryIdRetrieve,
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    // authorisation
    it("throws error if you don't own the category", async () => {
      const result = await categoryApi.category({
        variables: {
          id: otherCategoryId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    // missing key
    it("throws error if category doesn't exist", async () => {
      const result = await categoryApi.category({
        variables: {
          id: '0',
        },
        token,
      })
      expectErrorMessage(result, 'Category cannot be found')
      expectErrorCode(result, 'BAD_USER_INPUT')
    })
  })
  describe('categories: [Category!]!', async () => {
    // success
    it('successfully returns categories owned by authenticated user', async () => {
      const result = await categoryApi.categories({ token })
      expect(result.data.data.categories.length).to.eql(3)
    })
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await categoryApi.categories({})
      expectErrorMessage(result, 'Not authenticated as user')
    })
  })
  describe('categoryCreate(description: String!, color: String): Category', () => {
    // success
    it('successfully creates a category if color formatted correctly', async () => {
      const result = await categoryApi.categoryCreate({
        variables: {
          description: 'test',
          color: '#333',
        },
        token,
      })

      const expectedResult = {
        data: {
          categoryCreate: {
            description: 'test',
            color: '#333',
          },
        },
      }

      expect(result.data).to.eql(expectedResult)
    })
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await categoryApi.categoryCreate({
        variables: {
          description: 'test',
          color: '#333',
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    // required attribute
    it('throws error if the description is empty', async () => {
      const result = await categoryApi.categoryCreate({
        variables: {
          description: '',
        },
        token,
      })
      expectErrorMessage(
        result,
        'Validation error: Category description cannot be empty',
      )
    })
    // validation
    it('throws error if hex code is formatted incorrectly', async () => {
      const result = await categoryApi.categoryCreate({
        variables: {
          description: 'test',
          color: 'notacolor',
        },
        token,
      })
      expectErrorMessage(
        result,
        'Validation error: Category color must be a hex color code (of length 3 of 6)',
      )
    })
  })
  describe('categoryUpdate(id: ID!, description: String, color: String): Category', () => {
    // success
    it('successfully updates category if color formatted correctly', async () => {
      const result = await categoryApi.categoryUpdate({
        variables: {
          id: myCategoryIdUpdate,
          color: '#bbb',
        },
        token,
      })
      const expectedResult = {
        data: {
          categoryUpdate: {
            id: myCategoryIdUpdate.toString(),
            description: 'User 1 Category 2',
            color: '#bbb',
          },
        },
      }

      expect(result.data).to.eql(expectedResult)
    })
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await categoryApi.categoryUpdate({
        variables: {
          id: myCategoryIdUpdate,
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    // authorisation
    it("throws error if you don't own the category (pk)", async () => {
      const result = await categoryApi.categoryUpdate({
        variables: {
          id: otherCategoryId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    // missing key
    it("throws error if key doesn't exist for category (pk)", async () => {
      const result = await categoryApi.categoryUpdate({
        variables: {
          id: 100,
          description: 'New Category Name',
          color: '#333',
        },
        token,
      })
      expectErrorMessage(result, 'Category cannot be found')
    })
    // required attribute
    it('throws error if the description is empty', async () => {
      const result = await categoryApi.categoryUpdate({
        variables: {
          id: myCategoryIdUpdate,
          description: '',
          color: '#333',
        },
        token,
      })
      expectErrorMessage(
        result,
        'Validation error: Category description cannot be empty',
      )
    })
    // validation
    it('throws error if hex code is formatted incorrectly', async () => {
      const result = await categoryApi.categoryUpdate({
        variables: {
          id: myCategoryIdUpdate,
          color: 'notacolor',
        },
        token,
      })
      expectErrorMessage(
        result,
        'Validation error: Category color must be a hex color code (of length 3 of 6)',
      )
    })
  })
  describe('categoryDelete(id: ID!): Boolean!', () => {
    // success
    it('successfully deletes a category', async () => {
      const result = await categoryApi.categoryDelete({
        variables: {
          id: myCategoryIdDelete,
        },
        token,
      })
      expect(result.data.data.categoryDelete).to.eql(true)
    })
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await categoryApi.categoryDelete({
        variables: {
          id: myCategoryIdDelete,
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    // authorisation
    it("throws error if you don't own category", async () => {
      const result = await categoryApi.categoryDelete({
        variables: {
          id: otherCategoryId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    // missing key
    it('throws error if category id not exist', async () => {
      const result = await categoryApi.categoryDelete({
        variables: {
          id: '100',
        },
        token,
      })
      expectErrorMessage(result, 'Category cannot be found')
    })
  })
})
