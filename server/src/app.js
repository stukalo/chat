const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const bodyParser = require('body-parser');
const connect = require('./database/connect');
const getSessionData = require('./utils/getSessionData');

const express = require('express');
const app = express();
const expressWs = require('express-uws')(app);

const chatRouter = require('./routes/chatRouter');
const usersRouter = require('./routes/usersRouter');
const wsChatRouter = require('./routes/wsChatRouter');
const registrationRouter = require('./routes/registrationRouter');
const authorizationRouter = require('./routes/authorizationRouter');

connect();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use('/reg', registrationRouter);
app.use('/auth', authorizationRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);

expressWs.getWss().on('connection', (ws, req) => {
    const { token } = req.query;
    const sessionData = getSessionData(token);

    if (!sessionData) {
        ws.close();
        return;
    }

    ws.sessionData = sessionData;
    wsChatRouter.connectionHandler(ws);
});
app.ws('/ws-chat', wsChatRouter.webSocketHandler);

module.exports = app;
