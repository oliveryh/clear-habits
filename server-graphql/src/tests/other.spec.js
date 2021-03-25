import { expect, assert } from 'chai'

import * as categoryApi from './categoryApi.js'
import * as userApi from './userApi.js'
import * as entryApi from './entryApi.js'

const expectErrorMessage = (result, message) =>
  expect(result.data.errors[0].message).to.eql(message)

const expectErrorCode = (result, code) =>
  expect(result.data.errors[0].extensions.code).to.eql(code)

describe('other', () => {
  let token = 0
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
  describe('cache', () => {
    // success
    it('should invalidate loader after mutation', async () => {
      const initialEntries = await entryApi.entries({ token })
      const categoryId =
        initialEntries.data.data.entries[0].task.project.category.id
      const categoryColor =
        initialEntries.data.data.entries[0].task.project.category.color
      const categoryColorExpected = '#123'
      const changedCategory = await categoryApi.categoryUpdate({
        variables: {
          id: categoryId,
          color: categoryColorExpected,
        },
        token,
      })
      const changedEntries = await entryApi.entries({ token })
      const categoryColorActual = changedEntries.data.data.entries.filter(
        (e) => e.id === categoryId,
      )[0].task.project.category.color

      expect(categoryColorExpected).to.eql(categoryColorActual)
    })
  })
})
