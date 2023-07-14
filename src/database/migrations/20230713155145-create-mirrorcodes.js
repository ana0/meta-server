module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("mirrorcodes", {
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
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mintcode: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("mirrorcodes");
  },
};