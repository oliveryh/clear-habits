import * as Sequelize from 'sequelize';
import { Entry } from 'webpack';

import { SequelizeAttributes } from '../typings/SequelizeAttributes';

export interface EntryAttributes {
  // primary key
  id?: number;
  // foreign keys
  userId?: number;
  taskId?: number;
  // model attributes
  order?: number;
  complete?: boolean;
  date?: string;
  timerActive?: boolean;
  timerTrackedTime?: number;
  timerEstimatedTime?: number;
  timerStartedAt?: Date | null;
  // reorder
  entries?: Array<EntryAttributes>;
}

export interface EntryInstance extends Sequelize.Instance<EntryAttributes>, EntryAttributes {
}

export interface EntryModel extends Sequelize.Model<EntryInstance, EntryAttributes, EntryAttributes> {
}

const entry = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<EntryInstance, EntryAttributes> => {

  const attributes: SequelizeAttributes<EntryAttributes> = {
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    date: {
      type: DataTypes.STRING,
      defaultValue: new Date().toISOString().substring(0, 10),
    },
    timerActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    timerTrackedTime: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
    },
    timerEstimatedTime: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    timerStartedAt: {
      type: DataTypes.DATE,
      defaultValue: null
    },
    order: {
      type: DataTypes.SMALLINT,
      defaultValue: 0
    }
  }

  const Entry = sequelize.define<EntryInstance, EntryAttributes>('entry', attributes) as EntryModel

  Entry.associate = (models) => {
    Entry.belongsTo(models.User)
    Entry.belongsTo(models.Task)
  }

  return Entry;
    
}

export default entry
