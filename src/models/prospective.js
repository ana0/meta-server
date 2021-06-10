import { DataTypes } from "sequelize";

import db from "../database";

const Prospective = db.define("prospective", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tokenId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  hash: {
    type: DataTypes.STRING,
  },
});

export default Prospective;
