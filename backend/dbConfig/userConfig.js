const { Sequelize } = require('sequelize');

const sequelizeUser = new Sequelize('userAuth', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelizeUser;
