import Sequelize from "sequelize";

import config from "./config";

export default new Sequelize(config.url, {
  dialect: config.dialect,
  logging: (msg) => {
    //console.log(msg);
  },
});

Sequelize.postgres.DECIMAL.parse = function (value) {
  return parseFloat(value);
};
