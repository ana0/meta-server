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
        type: DataTypes.INTEGER,
    },
    killed: {
        type: DataTypes.BOOLEAN,
    },
    nearDeathExperience: {
        type: DataTypes.BOOLEAN,
    },
    nearDeathTime: {
        type: DataTypes.INTEGER,
    },
    interactionCount: {
        type: DataTypes.INTEGER,
    },
  },
);

export default FestivalArtwork;