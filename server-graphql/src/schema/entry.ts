import { gql } from 'apollo-server-express';
const BigInt = require('graphql-bigint')

export default gql`

  scalar BigInt

  extend type Query {
    entry(id: ID!): Entry!
    entries: [Entry!]!
  }

  extend type Mutation {
    entryCreate(taskId: ID!, date: String, timerEstimatedTime: Int): Entry!
    entryCreateWithTask(projectId: ID!, description: String!, date: String, timerEstimatedTime: Int): Entry!
    entryUpdate(id: ID!, taskId: ID, complete: Boolean, date: String, timerTrackedTime: Int, timerEstimatedTime: Int): Entry
    entryDelete(id: ID!): Boolean!
    entryStart(id: ID!): Entry
    entryStop(id: ID!): Entry
    entryComplete(id: ID!): Entry
    entryReorder(date: String!, entries: [EntryReorder!]!): [Entry!]!
  }

  input EntryReorder {
    id: ID!
    order: Int!
  }

  type Entry {
    id: ID!
    order: Int!
    complete: Boolean!
    date: String!
    timerActive: Boolean!
    timerTrackedTime: Int!
    timerEstimatedTime: Int!
    timerStartedAt: BigInt
    user: User!
    task: Task!
  }
`;
