const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const StepReport = sequelize.define('stepReport', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    steps: Sequelize.INTEGER,
    occuredAt: Sequelize.DATE
});

module.exports = StepReport;