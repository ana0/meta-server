module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("burned", {
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tokenId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(42),
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("burned");
  },
};
