const express = require('express');
const router = express.Router();
const chatService = require('../services/chat');
const messagesService = require('../services/messages');
const { OK, ERROR } = require('../constants/responseStatus');
const authorization = require('../middleware/authorization');

router.use(authorization);

router.get('/messages', async (request, response) => {
    let status = OK;
    let data = null;
    const { userName } = request.sessionData;

    try {
        const messagesModels = await messagesService.readUserMessages(userName);
        data = messagesModels.map(message => ({
            date: message.date,
            sender: message.sender,
            content: message.content,
            receiver: message.receiver
        }));
    } catch (err) {
        status = ERROR;
        data = { message: err.message };
    }

    response.json({ status, data });
});

router.get('/dialog', async (request, response) => {
    let status = OK;
    let data = null;
    const { userName: receiver } = request.query;
    const { userName: sender } = request.sessionData;

    try {
        const messagesModels = await messagesService.readUsersDialog({ sender, receiver });
        data = messagesModels.map(message => ({
            date: message.date,
            sender: message.sender,
            content: message.content,
            receiver: message.receiver
        }));
    } catch (err) {
        status = ERROR;
        data = { message: err.message };
    }

    response.json({ status, data });
});

router.get('/online', async (request, response) => {
    let status = OK;
    let data = null;

    try {
        data = await chatService.getOnlineUsers();
    } catch (err) {
        status = ERROR;
        data = { message: err.message };
    }

    response.json({ status, data });
});

module.exports = router;
