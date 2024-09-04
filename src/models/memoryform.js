import { DataTypes } from "sequelize";

import db from "../database";

const Memoryform = db.define("memoryform", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  killedCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  killedNotCreatedCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  distributions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  uniqueDistributions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  carePatterns: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  message: {
    type: DataTypes.TEXT,
  },
  approveForExhibition: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default Memoryform;
