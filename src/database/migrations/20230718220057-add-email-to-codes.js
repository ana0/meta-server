module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("mirrorcodes", "email", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn("mirrorcodes", "email");
  },
};
