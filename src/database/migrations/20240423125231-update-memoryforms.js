module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("memoryforms", "killedNotCreatedCount", {
      type: Sequelize.INTEGER,
    }).then(() => {
      return queryInterface.addColumn("memoryforms", "distributions", {type: Sequelize.INTEGER})
    }).then(() => {
      return queryInterface.addColumn("memoryforms", "uniqueDistributions", {type: Sequelize.INTEGER})
    }).then(() => {
      return queryInterface.addIndex('memoryforms', ['address'])
    }).then(() => {
      return queryInterface.addIndex('lifeforms', ['tokenId'])
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn("memoryforms", "killedNotCreatedCount")
    .then(() => queryInterface.removeColumn("memoryforms", "distributions"))
    .then(() => queryInterface.removeColumn("memoryforms", "uniqueDistributions"))
    .then(() => queryInterface.dropIndex('memoryforms', ['address']))
    .then(() => queryInterface.dropIndex('lifeforms', ['tokenId']))
  },
};
