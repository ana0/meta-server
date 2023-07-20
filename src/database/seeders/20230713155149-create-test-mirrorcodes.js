const csv = require("csv-parser");
const fs = require("fs");

module.exports = {
  up: (queryInterface) => {
    const wrap = new Promise((resolve) => {
      const codes = [];

      fs.createReadStream("./mirrorcodes.csv")
        .pipe(csv())
        .on("data", (row) => {
          console.log(row);
          codes.push({ ...row, createdAt: new Date(), updatedAt: new Date() });
        })
        .on("end", () => {
          console.log("CSV file successfully processed");
          return resolve(queryInterface.bulkInsert("mirrorcodes", codes));
        });
    });

    return wrap;
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("mirrorcodes", [
      {
        tokenId: 1,
      },
      {
        tokenId: 2,
      },
      {
        tokenId: 3,
      },
    ]);
  },
};
