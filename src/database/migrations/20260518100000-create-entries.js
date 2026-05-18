module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("entries", {
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
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        unique: true,
      },
      energy: {
        type: Sequelize.INTEGER,
      },
      mood: {
        type: Sequelize.INTEGER,
      },
      cognition: {
        type: Sequelize.INTEGER,
      },
      libido: {
        type: Sequelize.INTEGER,
      },
      sleep: {
        type: Sequelize.INTEGER,
      },
      note: {
        type: Sequelize.TEXT,
      },
      cycleDay: {
        type: Sequelize.INTEGER,
      },
      isPeriodStart: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      lhResult: {
        type: Sequelize.STRING,
      },
      temperatureDeviation: {
        type: Sequelize.DECIMAL,
      },
      loggedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("entries");
  },
};
