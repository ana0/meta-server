module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("lifeforms", "message", {
      type: Sequelize.TEXT,
    }).then(() => {
      return queryInterface.addColumn("memoryforms", "message", { type: Sequelize.TEXT })
    }).then(() => {
      return queryInterface.addColumn("memoryforms", "approveForExhibition", { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false })
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn("lifeforms", "message")
    .then(() => queryInterface.removeColumn("memoryforms", "message"))
    .then(() => queryInterface.removeColumn("memoryforms", "approveForExhibition"))
  },
};
