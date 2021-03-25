import * as Sequelize from 'sequelize';

import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface ProjectAttributes {
  id?: number;
  description: string;
  color?: string;
  userId?: number;
  categoryId?: number;
}

export interface ProjectInstance extends Sequelize.Instance<ProjectAttributes>, ProjectAttributes {
}

export interface ProjectModel extends Sequelize.Model<ProjectInstance, ProjectAttributes> {
  
}

const project = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<ProjectInstance, ProjectAttributes> => {

  const attributes: SequelizeAttributes<ProjectAttributes> = {
    description: {
      type: DataTypes.STRING,
      validate: { notEmpty: { msg: 'Project description cannot be empty' } },
    },
    color: {
      type: DataTypes.STRING,
      validate: {
        validateHexColor: function (value: string) {
          if (!/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/i.test(value)) {
            throw new Error(
              'Project color must be a hex color code (of length 3 of 6)'
            );
          }
        },
      },
    },
  }

  const Project = sequelize.define<ProjectInstance, ProjectAttributes>('project', attributes) as ProjectModel

  Project.associate = (models) => {
    Project.belongsTo(models.User);
    Project.belongsTo(models.Category);
    Project.hasMany(models.Task);
  };

  return Project;
    
}

export default project