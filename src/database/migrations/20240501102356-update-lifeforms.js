module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("lifeforms", "birth", {
      type: Sequelize.BIGINT,
    }).then(() => {
      return queryInterface.addColumn("lifeforms", "death", {type: Sequelize.BIGINT})
    }).then(() => {
      return queryInterface.changeColumn("lifeforms", 'ageAtDeath', {
        type: Sequelize.BIGINT,
        allowNull: true,
      })
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn("lifeforms", "birth")
    .then(() => queryInterface.removeColumn("lifeforms", "death"))
    .then(() => queryInterface.changeeColumn("lifeforms", "ageAtDeath", {
      type: Sequelize.INTEGER
    }))
  },
};
