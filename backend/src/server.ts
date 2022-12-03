import express from 'express';
import bodyParser from 'body-parser';
import connection from './database/database';

import ChooseController from './choose/ChooseController';
import Choose from './choose/Choose';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connection.authenticate();


app.use('/', ChooseController);
app.listen(3030);