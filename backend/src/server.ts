import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connection from './database/database';
import ChooseController from './choose/ChooseController';
import UsersController from './user/UsersController';
import Choose from './choose/Choose';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connection.authenticate();


app.use('/', ChooseController);
app.use('/', UsersController);
app.listen(3030);