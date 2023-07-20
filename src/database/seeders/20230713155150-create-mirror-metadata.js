module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("mirrors", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        description:
          "Mirror Piece is an interactive performance commissioned as part of Echoes 2023 by the Haus Der Kunst in München and orchestrated by Sarah Friend. In a future iteration, this token will be activated and transform in a collective dialogue.",
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
