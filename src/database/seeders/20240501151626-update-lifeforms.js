const csv = require("csv-parser");
const fs = require("fs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const wrap = new Promise((resolve) => {
      fs.createReadStream("./lifeforms.csv")
        .pipe(csv({ separator: ';'}))
        .on("data", async (row) => {
            await queryInterface.bulkUpdate("lifeforms", {
              ...row,
              updatedAt: new Date(),
            }, { tokenId: row.tokenId })
       })
      .on("end", async () => {
        
        console.log("CSV file successfully processed");
        return resolve();
      });
    })
    return wrap



  },
  down: (queryInterface) => {
    const todelete = []
    for (let i = 4; i < 213; i++) {
      todelete.push({ tokenId: i })
    }
    return queryInterface.bulkDelete("lifeforms", todelete);
  },
};
