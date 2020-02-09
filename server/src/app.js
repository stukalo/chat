
const bodyParser = require('body-parser');
const authorizationRouter = require('./routes/authorizationRouter');
const registrationRouter = require('./routes/registrationRouter');
const usersRouter = require('./routes/usersRouter');
const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const connect = require('./database/connect');

connect();
const app = express();

app.use(bodyParser.json());
app.use('/reg', registrationRouter);
app.use('/auth', authorizationRouter);
app.use('/users', usersRouter);

module.exports = app;
