const Sequelize = require('sequelize');

const sequelize = new Sequelize('step_o_meter', 'stepo', 'stepo1234567', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;