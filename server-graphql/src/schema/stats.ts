import { gql } from 'apollo-server-express';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

export default gql`
  scalar JSONObject

  extend type Query {
    stats(startDate: String!, period: String!): Stats!
  }

  type Stats {
    statsBarCategory: JSONObject
    statsPieCategory: JSONObject
    statsBarProject: JSONObject
    statsPieProject: JSONObject
  }
`;
