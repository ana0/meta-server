module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("mirrors", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        description: "A mirror requires patient labour and attention",
        image:
          "https://isthisa.computer/ipfs/QmZDD2vSxnBdLf6PgEmLqodG5LnSsXvp8WTWy7MRwQYJzk/mirror-piece-square.jpg",
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("mirrors", [
      {
        id: 1,
      },
    ]);
  },
};
