import { gql } from 'apollo-server-express';

import userSchema from './user';
import categorySchema from './category';
import projectSchema from './project';
import taskSchema from './task';
import entrySchema from './entry';
import statsSchema from './stats';


const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, categorySchema, projectSchema, taskSchema, entrySchema, statsSchema];
