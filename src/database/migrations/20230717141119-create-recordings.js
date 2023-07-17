module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("recordings", {
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
      attachableId: {
        type: Sequelize.INTEGER,
      },
      attachableType: {
        type: Sequelize.STRING,
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fileType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mirrorcodeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "mirrorcodes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("recordings");
  },
};
