import { DataTypes } from 'sequelize';

import db from "../database";

const MemoryformLifeform = db.define(
  'memoryforms2lifeforms',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    memoryformId: {
      type: DataTypes.INTEGER,
    },
    lifeformId: {
      type: DataTypes.INTEGER,
    },
    created: {
        type: DataTypes.BOOLEAN,
    },
    shortHold: {
        type: DataTypes.BOOLEAN,
    },
    shortHoldTime: {
        type: DataTypes.DATE,
    },
    shortHoldDuration: {
      type: DataTypes.INTEGER,
    },
    shortHoldRepeat: {
      type: DataTypes.BOOLEAN,
    },
    killed: {
        type: DataTypes.BOOLEAN,
    },
    nearDeathExperience: {
        type: DataTypes.BOOLEAN,
    },
    nearDeathTime: {
        type: DataTypes.DATE,
    },
    nearDeathDuration: {
      type: DataTypes.INTEGER,
    },
    nearDeathRepeat: {
      type: DataTypes.BOOLEAN,
    },
    interactionCount: {
        type: DataTypes.INTEGER,
    },
  },
);

export default MemoryformLifeform;