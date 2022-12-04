const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('choosemedb', 'root', 'a', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00'
});

export default sequelize;