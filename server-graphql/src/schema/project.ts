import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    project(id: ID!): Project!
    projects: [Project!]!
  }

  extend type Mutation {
    projectCreate(categoryId: ID!, description: String!, color: String): Project
    projectUpdate(id: ID!, categoryId: ID, description: String, color: String): Project
    projectDelete(id: ID!): Boolean!
  }

  type Project {
    id: ID!
    description: String!
    user: User!
    category: Category!
    color: String
    tasks: [Task!]!
  }
`;
