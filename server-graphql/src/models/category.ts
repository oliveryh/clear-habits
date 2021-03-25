import * as Sequelize from 'sequelize';

import { UserInputError } from 'apollo-server-express'

import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface CategoryAttributes {
  id?: number;
  description: string;
  color?: string;
  userId?: number;
}

export interface CategoryInstance extends Sequelize.Instance<CategoryAttributes>, CategoryAttributes {
}

export interface CategoryModel extends Sequelize.Model<CategoryInstance, CategoryAttributes> {
  
}

const category = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<CategoryInstance, CategoryAttributes> => {

  const attributes: SequelizeAttributes<CategoryAttributes> = {
    description: {
      type: DataTypes.STRING,
      validate: { notEmpty: { msg: 'Category description cannot be empty' } },
    },
    color: {
      type: DataTypes.STRING,
      validate: {
        validateHexColor: function (value: string) {
          if (!/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/i.test(value)) {
            throw new UserInputError(
              'Category color must be a hex color code (of length 3 of 6)'
            );
          }
        },
      },
    },
  }

  const Category = sequelize.define<CategoryInstance, CategoryAttributes>('category', attributes) as CategoryModel

  Category.associate = (models) => {
    Category.belongsTo(models.User);
    Category.hasMany(models.Project);
  };

  return Category;
    
}

export default category