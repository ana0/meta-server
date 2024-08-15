const csv = require("csv-parser");
const fs = require("fs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const wrap = new Promise((resolve) => {
      fs.createReadStream("./memoryforms2lifeforms.csv")
        .pipe(csv({ separator: ';'}))
        .on("data", async (row) => {

            console.log(row)
            const memoryform = await queryInterface.sequelize.query(`SELECT id FROM memoryforms WHERE address = '${row.address}';`)
            const lifeform = await queryInterface.sequelize.query(`SELECT id FROM lifeforms WHERE "tokenId" = '${row.tokenId}';`)
            console.log(lifeform[0], row.tokenId)
            delete row.address;
            delete row.tokenId;
            if(row.shortHold === 'false') {
              delete row.shortHoldTime;
            } else {
              row.shortHoldTime = new Date(row.shortHoldTime*1000);
            }
            if(row.nearDeathExperience === 'false') {
              delete row.nearDeathTime;
            } else {
              row.nearDeathTime = new Date(row.nearDeathTime*1000);
            }
            
            
            await queryInterface.bulkInsert("memoryforms2lifeforms", [{
              ...row,
              memoryformId: memoryform[0][0].id,
              lifeformId: lifeform[0][0].id,
              createdAt: new Date(),
              updatedAt: new Date(),
            }])
       })
      .on("end", async () => {
        
        console.log("CSV file successfully processed");
        return resolve();
      });
    })
    return wrap



  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("memoryforms2lifeforms", todelete);
  },
};
