module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("memoryforms", {
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
      createdCount: {
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING,
      },
      killedCount: {
        type: Sequelize.INTEGER,
      },
      carePatterns: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("memoryforms");
  },
};
