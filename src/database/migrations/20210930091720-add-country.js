module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn("buyers", "country", {
        type: Sequelize.STRING,
      })
      .then(() => {
        return queryInterface.addColumn("prospectives", "country", {
          type: Sequelize.STRING,
        });
      });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn("buyers", "country").then(() => {
      return queryInterface.removeColumn("prospectives", "country");
    });
  },
};
