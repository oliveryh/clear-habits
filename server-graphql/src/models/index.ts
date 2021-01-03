import Sequelize from 'sequelize';

import userModel, { UserModel } from './user';
import categoryModel, { CategoryModel } from './category';
import projectModel, { ProjectModel } from './project';
import taskModel, { TaskModel } from './task';
import entryModel, { EntryModel } from './entry'


const sequelize = new Sequelize(
  process.env.TEST_DATABASE || process.env.DATABASE || 'app',
  process.env.DATABASE_USER || 'postgres',
  process.env.DATABASE_PASSWORD || 'changethis',
  {
    dialect: 'postgres',
  }
);

export interface Models {
  [key: string]: any
  User: UserModel,
  Category: CategoryModel
  Project: ProjectModel,
  Task: TaskModel,
  Entry: EntryModel,
}

const models: Models = {
  User: sequelize.import('User', userModel) as UserModel,
  Category: sequelize.import('Category', categoryModel) as CategoryModel,
  Project: sequelize.import('Project', projectModel) as ProjectModel,
  Task: sequelize.import('Task', taskModel) as TaskModel,
  Entry: sequelize.import('Entry', entryModel) as EntryModel,
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
