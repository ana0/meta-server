const csv = require("csv-parser");
const fs = require("fs");

module.exports = {
  up: (queryInterface) => {
    const wrap = new Promise((resolve) => {
      const forms = [];

      fs.createReadStream("./memoryforms.csv")
        .pipe(csv({ separator: ';'} ))
        .on("data", (row) => {
          console.log(row);
          forms.push({
            ...row,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        })
        .on("end", () => {
          console.log("CSV file successfully processed");
          return resolve(queryInterface.bulkInsert("memoryforms", forms));
        });
    });

    return wrap;
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("memoryforms");
  },
};
