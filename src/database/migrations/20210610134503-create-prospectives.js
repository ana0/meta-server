module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("prospectives", {
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
      hash: {
        type: Sequelize.STRING(66),
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("prospectives");
  },
};
