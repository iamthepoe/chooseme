import {DataTypes} from 'sequelize';
import Sequelize from '../database/database';


const User = Sequelize.define('users', {
	id:{
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},

	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	token: {
		type: DataTypes.STRING,
		allowNull: false
	},
	color: {
		type: DataTypes.STRING,
		allowNull: true
	}
});

//User.sync({force: true});

export default User;
