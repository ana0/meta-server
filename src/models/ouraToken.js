import { DataTypes } from "sequelize";

import db from "../database";

// Single-row store for the connected Oura account's OAuth2 tokens.
const OuraToken = db.define("ouraToken", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  accessToken: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  scope: {
    type: DataTypes.STRING,
  },
});

export default OuraToken;
