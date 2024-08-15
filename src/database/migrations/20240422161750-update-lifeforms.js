module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("lifeforms", "alive", {
      type: Sequelize.BOOLEAN,
    }).then(() => {
      return queryInterface.addColumn("lifeforms", "ageAtDeath", {
        type: Sequelize.INTEGER,
      })
    }).then(() => {
      return queryInterface.addColumn("lifeforms", "totalCaretakers", {
        type: Sequelize.INTEGER,
      })
    }).then(() => {
      return queryInterface.addColumn("lifeforms", "totalTransfers", {
        type: Sequelize.INTEGER,
      })
    }).then(() => {
      return queryInterface.addColumn("lifeforms", "minTransfers", {
        type: Sequelize.INTEGER,
      })
    }).then(() => {
      return queryInterface.addColumn("lifeforms", "archetypes", {
        type: Sequelize.ARRAY(Sequelize.STRING),
      })
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn("lifeforms", "alive")
      .then(() => queryInterface.removeColumn("lifeforms", "ageAtDeath"))
      .then(() => queryInterface.removeColumn("lifeforms", "totalCaretakers"))
      .then(() => queryInterface.removeColumn("lifeforms", "totalTransfers"))
      .then(() => queryInterface.removeColumn("lifeforms", "minTransfers"))
      .then(() => queryInterface.removeColumn("lifeforms", "archetypes"));
  },
};
