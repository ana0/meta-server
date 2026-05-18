import { DataTypes } from "sequelize";

import db from "../database";

const Entry = db.define("entry", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    unique: true,
  },
  energy: {
    type: DataTypes.INTEGER,
  },
  mood: {
    type: DataTypes.INTEGER,
  },
  cognition: {
    type: DataTypes.INTEGER,
  },
  libido: {
    type: DataTypes.INTEGER,
  },
  sleep: {
    type: DataTypes.INTEGER,
  },
  note: {
    type: DataTypes.TEXT,
  },
  cycleDay: {
    type: DataTypes.INTEGER,
  },
  isPeriodStart: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  lhResult: {
    type: DataTypes.STRING,
  },
  temperatureDeviation: {
    type: DataTypes.DECIMAL,
  },
  loggedAt: {
    type: DataTypes.DATE,
  },
});

export default Entry;
