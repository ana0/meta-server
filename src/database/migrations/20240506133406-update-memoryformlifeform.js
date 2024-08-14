module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("memoryforms2lifeforms", "shortHoldTime")
    .then(() => {
      return queryInterface.removeColumn("memoryforms2lifeforms", "nearDeathTime")
    }).then(() => {
      return queryInterface.addColumn("memoryforms2lifeforms", "nearDeathDuration", {
        type: Sequelize.BIGINT
      })
    }).then(() => {
      return queryInterface.addColumn("memoryforms2lifeforms", "shortHoldDuration", {
        type: Sequelize.BIGINT
      })
    }).then(() => {
      return queryInterface.addColumn("memoryforms2lifeforms", "shortHoldRepeat", {
        type: Sequelize.BOOLEAN
      })
    }).then(() => {
      return queryInterface.addColumn("memoryforms2lifeforms", "nearDeathRepeat", {
        type: Sequelize.BOOLEAN
      })
    }).then(() => {
      return queryInterface.addColumn("memoryforms2lifeforms", "shortHoldTime", {
        type: Sequelize.DATE
      })
    }).then(() => {
      return queryInterface.addColumn("memoryforms2lifeforms", "nearDeathTime", {
        type: Sequelize.DATE
      })
    })
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn("memoryforms2lifeforms", "nearDeathDuration")
    .then(() => queryInterface.removeColumn("memoryforms2lifeforms", "shortHoldDuration"))
    .then(() => queryInterface.removeColumn("memoryforms2lifeforms", "shortHoldRepeat"))
    .then(() => queryInterface.removeColumn("memoryforms2lifeforms", "nearDeathRepeat"))
    .then(() => queryInterface.removeColumn("memoryforms2lifeforms", "shortHoldTime"))
    .then(() => queryInterface.removeColumn("memoryforms2lifeforms", "nearDeathTime"))
    .then(() => queryInterface.addColumn("memoryforms2lifeforms", "shortHoldTime", { type: Sequelize.INTEGER }))
    .then(() => queryInterface.addColumn("memoryforms2lifeforms", "nearDeathTime", { type: Sequelize.INTEGER }))
  },
};
