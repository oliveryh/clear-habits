import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    category(id: ID!): Category!
    categories: [Category!]!
    planner: [Category!]!
  }

  extend type Mutation {
    categoryCreate(description: String!, color: String): Category
    categoryUpdate(id: ID!, description: String, color: String): Category
    categoryDelete(id: ID!): Boolean!
  }

  type Category {
    id: ID!
    description: String!
    user: User!
    color: String
    projects: [Project!]!
  }
`;
