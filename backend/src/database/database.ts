const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('choosemedb', 'root', 'a', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;