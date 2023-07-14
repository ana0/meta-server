module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("mirrorcodes", "minted", {
      type: Sequelize.BOOLEAN,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn("mirrorcodes", "minted");
  },
};
