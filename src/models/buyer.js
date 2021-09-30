import { DataTypes } from "sequelize";

import db from "../database";

const Buyer = db.define("buyer", {
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

export default Buyer;
