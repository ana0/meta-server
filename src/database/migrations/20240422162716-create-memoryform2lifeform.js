module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('memoryforms2lifeforms', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      memoryformId: {
        type: Sequelize.INTEGER,
      },
      lifeformId: {
        type: Sequelize.INTEGER,
      },
      created: {
        type: Sequelize.BOOLEAN,
      },
      shortHold: {
        type: Sequelize.BOOLEAN,
      },
      shortHoldTime: {
        type: Sequelize.INTEGER,
      },
      killed: {
        type: Sequelize.BOOLEAN,
      },
      nearDeathExperience: {
        type: Sequelize.BOOLEAN,
      },
      nearDeathTime: {
        type: Sequelize.INTEGER,
      },
      interactionCount: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('memoryforms2lifeforms');
  },
};