module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("lifeforms", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        tokenId: 1,
        name: "Lifeform #1",
        description: "A garden requires patient labour and attention",
        image: "https://isthisa.computer/api/static/images/pink.jpg",
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        tokenId: 2,
        name: "Lifeform #2",
        description: "A system requires gentle support and maintenance",
        image: "https://isthisa.computer/api/static/images/purple.jpg",
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        tokenId: 3,
        name: "Lifeform #3",
        description:
          "A companion requires mindful observation and understanding",
        image: "https://isthisa.computer/api/static/images/mint.jpg",
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("lifeforms", [
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
