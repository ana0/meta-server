module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("mintcodes", {
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
      tokenId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mintcode: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("mintcodes");
  },
};