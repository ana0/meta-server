import { DataTypes } from "sequelize";

import db from "../database";

const Lifeform = db.define("lifeform", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tokenId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  alive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  ageAtDeath: {
    type: DataTypes.INTEGER,
  },
  totalCaretakers: {
    type: DataTypes.INTEGER,
  },
  totalTransfers: {
    type: DataTypes.INTEGER,
  },
  minTransfers: {
    type: DataTypes.INTEGER,
  },
  archetypes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  }
});

export default Lifeform;
