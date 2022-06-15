const csv = require("csv-parser");
const fs = require("fs");

module.exports = {
  up: (queryInterface) => {
    const wrap = new Promise((resolve) => {
      const codes = [];

      fs.createReadStream("./card-metadata.csv")
        .pipe(csv())
        .on("data", (row) => {
          console.log(row);
          codes.push({
            ...row,
            createdAt: new Date(),
            updatedAt: new Date(),
            description: `The ${row.name}. This NFT will become transferable only if the secrets from off.supply are revealed`,
            image: `https://isthisa.computer/api/static/images/${row.name.replace(
              / /g,
              "-"
            )}.jpg`,
          });
        })
        .on("end", () => {
          console.log("CSV file successfully processed");
          codes.sort(() => Math.random() - 0.5);
          const withTokenids = codes.map((code, index) => {
            return {
              ...code,
              tokenId: index,
            };
          });
          return resolve(queryInterface.bulkInsert("wildcards", withTokenids));
        });
    });

    return wrap;
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("wildcards");
  },
};
