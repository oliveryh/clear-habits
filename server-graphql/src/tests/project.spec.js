import { expect, assert } from 'chai'

import * as projectApi from './projectApi.js'
import * as userApi from './userApi.js'

const expectErrorMessage = (result, message) =>
  expect(result.data.errors[0].message).to.eql(message)

const expectErrorCode = (result, code) =>
  expect(result.data.errors[0].extensions.code).to.eql(code)

describe('projects', () => {
  let token = 0
  let myProjectIdRetrieve = 1
  let myProjectIdUpdate = 2
  let myProjectIdDelete = 3
  let otherProjectId = 4
  let myCategoryId = 1
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
  describe('project(id: ID!): Project!', () => {
    it('successfully returns a project', async () => {
      const result = await projectApi.project({
        variables: {
          id: myProjectIdRetrieve,
        },
        token,
      })
      const expectedResult = {
        data: {
          project: {
            id: myProjectIdRetrieve.toString(),
            description: 'User 1 Project 1',
            user: {
              username: 'oliver',
            },
            category: {
              description: 'User 1 Category 1',
              id: '1',
            },
            color: '#fff',
          },
        },
      }
      expect(result.data).to.eql(expectedResult)
    })
    it('throws error if unauthenticated', async () => {
      const result = await projectApi.project({
        variables: {
          id: 1,
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    it("throws error if you don't own the project", async () => {
      const result = await projectApi.project({
        variables: {
          id: otherProjectId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    it("throws error if project doesn't exist", async () => {
      const result = await projectApi.project({
        variables: {
          id: '0',
        },
        token,
      })
      expectErrorMessage(result, 'Project cannot be found')
      expectErrorCode(result, 'BAD_USER_INPUT')
    })
  })
  describe('projects: [Project!]!', async () => {
    it('successfully returns projects owned by authenticated user', async () => {
      const result = await projectApi.projects({ token })
      expect(result.data.data.projects.length).to.eql(3)
    })
    it('throws error if unauthenticated', async () => {
      const result = await projectApi.projects({})
      expectErrorMessage(result, 'Not authenticated as user')
    })
  })
  describe('projectCreate(categoryId: ID!, description: String!, color: String): Project', () => {
    it('successfully creates a project if color formatted correctly', async () => {
      const result = await projectApi.projectCreate({
        variables: {
          categoryId: myCategoryId,
          description: 'test',
          color: '#333',
        },
        token,
      })

      const expectedResult = {
        data: {
          projectCreate: {
            description: 'test',
            color: '#333',
          },
        },
      }

      expect(result.data).to.eql(expectedResult)
    })
    it('throws error if the description is empty', async () => {
      const result = await projectApi.projectCreate({
        variables: {
          categoryId: myCategoryId,
          description: '',
        },
        token,
      })
      expectErrorMessage(
        result,
        'Validation error: Project description cannot be empty',
      )
    })
    it('throws error if the categoryId is empty', async () => {
      const result = await projectApi.projectCreate({
        variables: {
          description: 'Here is a new task',
        },
        token,
      })
      expectErrorMessage(
        result,
        'Variable "$categoryId" of required type "ID!" was not provided.',
      )
    })
    it('throws error if hex code is formatted incorrectly', async () => {
      const result = await projectApi.projectCreate({
        variables: {
          categoryId: myCategoryId,
          description: 'test',
          color: 'notacolor',
        },
        token,
      })
      expectErrorMessage(
        result,
        'Validation error: Project color must be a hex color code (of length 3 of 6)',
      )
    })
    it("throws error if the categoryId doesn't exist", async () => {
      const result = await projectApi.projectCreate({
        variables: {
          categoryId: 100,
          description: 'Project 1',
        },
        token,
      })
      expectErrorMessage(result, 'Category cannot be found')
    })
    it("throws error if the categoryId doesn't belong to user", async () => {
      const result = await projectApi.projectCreate({
        variables: {
          categoryId: otherCategoryId,
          description: 'Project 1',
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
  })
  describe('projectDelete(id: ID!): Boolean!', () => {
    it('successfully deletes a project', async () => {
      const result = await projectApi.projectDelete({
        variables: {
          id: myProjectIdDelete,
        },
        token,
      })
      expect(result.data.data.projectDelete).to.eql(true)
    })
    it('throws error if project id not exist', async () => {
      const result = await projectApi.projectDelete({
        variables: {
          id: '100',
        },
        token,
      })
      expectErrorMessage(result, 'Project cannot be found')
    })
    it("throws error if you don't own project", async () => {
      const result = await projectApi.projectDelete({
        variables: {
          id: otherProjectId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
  })
  describe('projectUpdate(id: ID!, categoryId: ID, description: String, color: String): Project', () => {
    // authentication
    it('throws error if unauthenticated', async () => {
      const result = await projectApi.projectUpdate({
        variables: {
          id: myProjectIdUpdate,
        },
      })
      expectErrorMessage(result, 'Not authenticated as user')
    })
    // authorisation
    it("throws error if you don't own the project (pk)", async () => {
      const result = await projectApi.projectUpdate({
        variables: {
          id: otherProjectId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    it("throws error if you don't own the category (fk)", async () => {
      const result = await projectApi.projectUpdate({
        variables: {
          id: myProjectIdUpdate,
          categoryId: otherCategoryId,
        },
        token,
      })
      expectErrorMessage(result, 'Not authorised to take this action')
    })
    // missing key
    it("throws error if key doesn't exist for project (pk)", async () => {
      const result = await projectApi.projectUpdate({
        variables: {
          id: 100,
          categoryId: myCategoryId,
          description: 'New Project Name',
          color: '#333',
        },
        token,
      })
      expectErrorMessage(result, 'Project cannot be found')
    })
    it("throws error if key doesn't exist for category (fk)", async () => {
      const result = await projectApi.projectUpdate({
        variables: {
          id: myProjectIdUpdate,
          categoryId: 100,
          description: 'New Project Name',
          color: '#333',
        },
        token,
      })
      expectErrorMessage(result, 'Category cannot be found')
    })
    // required attribute
    it('throws error if the description is empty', async () => {
      const result = await projectApi.projectUpdate({
        variables: {
          id: myProjectIdUpdate,
          categoryId: myCategoryId,
          description: '',
          color: '#333',
        },
        token,
      })
      expectErrorMessage(
        result,
        'Validation error: Project description cannot be empty',
      )
    })
    // validation
    it('throws error if hex code is formatted incorrectly', async () => {
      const result = await projectApi.projectUpdate({
        variables: {
          id: myProjectIdUpdate,
          color: 'notacolor',
        },
        token,
      })
      expectErrorMessage(
        result,
        'Validation error: Project color must be a hex color code (of length 3 of 6)',
      )
    })
    it('successfully updates project if color formatted correctly', async () => {
      const result = await projectApi.projectUpdate({
        variables: {
          id: myProjectIdUpdate,
          color: '#bbb',
        },
        token,
      })
      const expectedResult = {
        data: {
          projectUpdate: {
            id: myProjectIdUpdate.toString(),
            description: 'User 1 Project 2',
            color: '#bbb',
          },
        },
      }

      expect(result.data).to.eql(expectedResult)
    })
  })
})
