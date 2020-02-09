const express = require('express');
const app = express();
const expressWs = require('express-uws')(app);

const getSessionData = require('./utils/getSessionData');
const bodyParser = require('body-parser');
const authorizationRouter = require('./routes/authorizationRouter');
const registrationRouter = require('./routes/registrationRouter');
const usersRouter = require('./routes/usersRouter');
const path = require('path');
const chatRouter = require('./routes/chatRouter');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const connect = require('./database/connect');

connect();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use('/reg', registrationRouter);
app.use('/auth', authorizationRouter);
app.use('/users', usersRouter);

expressWs.getWss().on('connection', ws => {
    const sessionData = getSessionData(ws);

    if (!sessionData) {
        console.log('no sessionData');
        ws.close();
    }

    console.log('sessionData', sessionData);
    ws.sessionData = sessionData;
});
app.ws('/ws-chat', chatRouter);

module.exports = app;
