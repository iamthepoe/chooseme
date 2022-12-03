import {DataTypes} from 'sequelize';
import Sequelize from '../database/database';


const Choose = Sequelize.define('chooses', {
	id:{
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},

	firstOption:{
		type: DataTypes.STRING,
		allowNull: false
	},
	secondOption:{
		type: DataTypes.STRING,
		allowNull: false
	},
	firstVotes:{
		type: DataTypes.INTEGER,
		allowNull: true
	},
	secondVotes:{
		type: DataTypes.INTEGER,
		allowNull: true
	}
});

//Choose.sync({force: true});

export default Choose;
