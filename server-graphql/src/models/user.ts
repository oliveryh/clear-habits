import * as Sequelize from 'sequelize';

import { SequelizeAttributes } from '../typings/SequelizeAttributes';

import bcrypt from 'bcrypt'

export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  findByLogin: (login: string) => Promise<UserInstance | null>
  generatePasswordHash: () => Promise<string>
  validatePassword: (password: string) => Promise<boolean>
}

export interface UserModel extends Sequelize.Model<UserInstance, UserAttributes, UserAttributes> {
  findByLogin: (login: string) => Promise<UserInstance | null>
  prototype: {
    generatePasswordHash: () => Promise<string>
    validatePassword: (password: string) => Promise<boolean>
    password: string;
  }
}

const user = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {

  const attributes: SequelizeAttributes<UserAttributes> = {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username must not be empty',
        },
      },
      unique: {
        name: 'username',
        msg: 'Username is already being used',
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email must not be empty',
        },
        isEmail: {
          msg: 'Email must be formatted correctly',
        },
      },
      unique: {
        name: 'email',
        msg: 'Email is already being used',
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password must not be empty',
        },
        len: {
          args: [7, 42],
          msg: 'Password must be more than 6 characters in length',
        }
      },
    },
  }

  const User = sequelize.define<UserInstance, UserAttributes>('user', attributes) as UserModel;

  User.associate = (models) => {
    User.hasMany(models.Project)
    User.hasMany(models.Task, { onDelete: 'CASCADE' })
  }

  User.findByLogin = async (login) => {
    let user = await User.findOne({
      where: {
        username: login,
      },
    })

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      })
    }

    return user
  }

  User.beforeCreate(async (user) => {
    user.password = await user.generatePasswordHash()
  })

  User.prototype.generatePasswordHash = async function () {
    const saltRounds: number = 10
    return await bcrypt.hash(this.password, saltRounds)
  }
  
  User.prototype.validatePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
  }

  return User;
    
}

export default user
