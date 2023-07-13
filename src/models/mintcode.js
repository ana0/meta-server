import { DataTypes } from "sequelize";

import db from "../database";

const MintCode = db.define("mintcode", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tokenId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mintcode: {
    type: DataTypes.STRING,
  },
});

export default MintCode;
