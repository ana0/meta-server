module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("lifeforms", {
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
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tokenId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("lifeforms");
  },
};
