const csv = require("csv-parser");
const fs = require("fs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkUpdate("lifeforms", {
      alive: true,
      updatedAt: new Date(),
    })
        
  },
  down: (queryInterface) => {
    const todelete = []
    for (let i = 4; i < 213; i++) {
      todelete.push({ tokenId: i })
    }
    return queryInterface.bulkDelete("lifeforms", todelete);
  },
};
