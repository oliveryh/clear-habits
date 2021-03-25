import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    task(id: ID!): Task!
    tasks: [Task!]!
  }

  extend type Mutation {
    taskCreate(projectId: ID!, description: String!): Task!
    taskUpdate(id: ID!, projectId: ID, description: String, complete: Boolean): Task
    taskDelete(id: ID!): Boolean!
  }

  type Task {
    id: ID!
    description: String!
    complete: Boolean!
    user: User!
    project: Project!
    entries: [Entry!]!
  }
`;
