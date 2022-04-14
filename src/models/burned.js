import { DataTypes } from "sequelize";

import db from "../database";

const Burned = db.define("burned", {
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
  country: {
    type: DataTypes.STRING,
  },
});

export default Burned;
