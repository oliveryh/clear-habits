import * as Sequelize from 'sequelize';

import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface TaskAttributes {
  id?: number;
  description: string;
  userId?: number;
  projectId?: number;
}

export interface TaskInstance extends Sequelize.Instance<TaskAttributes>, TaskAttributes {
}

export interface TaskModel extends Sequelize.Model<TaskInstance, TaskAttributes, TaskAttributes> {
}

const task = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<TaskInstance, TaskAttributes> => {

  const attributes: SequelizeAttributes<TaskAttributes> = {
    description: {
      type: DataTypes.STRING,
      validate: { notEmpty: { msg: 'Task description cannot be empty' } },
    },
  }

  const Task = sequelize.define<TaskInstance, TaskAttributes>('task', attributes) as TaskModel

  Task.associate = (models) => {
    Task.belongsTo(models.User)
    Task.belongsTo(models.Project)
    Task.hasMany(models.Entry)
  }

  return Task;
    
}

export default task
