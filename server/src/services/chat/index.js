const messagesService = require('../messages');
const {
    CREATE_CHAT_MESSAGE,
    CREATE_CHAT_MESSAGE_SUCCESS,
    CREATE_CHAT_MESSAGE_FAILURE
} = require('../../constants/messageTypes');

const clients = [];

const handleCreateChatMessage = (ws, { payload }) => {
    const { userName: sender } = ws.sessionData;
    const { receiver, content } = payload;
    const date = Date.now();
    const chatMessage = {
        receiver,
        content,
        sender,
        date
    };

    try {
        messagesService.createMessage(chatMessage);
        const message = {
            type: CREATE_CHAT_MESSAGE_SUCCESS,
            payload: chatMessage
        };
        sendUserMessage(sender, message);
        sendUserMessage(receiver, message);
    } catch (e) {
        const message = {
            type: CREATE_CHAT_MESSAGE_FAILURE,
            payload: chatMessage
        };
        sendUserMessage(sender, message);
    }
};

const handleClientMessage = (ws, { type, payload }) => {
    switch (type) {
        case CREATE_CHAT_MESSAGE: {
            handleCreateChatMessage(ws, { type, payload });
            break;
        }
        default: {
            console.info(`Unknown message type: ${type}`);
        }
    }
};

const handleClientConnect = ws => {
    clients.push(ws);
    broadcast(`connected ${clients.length}`);
};

const handleClientDisconnect = ws => {
    const index = clients.indexOf(ws);

    if (index > -1) {
        clients.splice(index, 1);
    }

    console.log(`ws closed index=${index}`);
};

const sendUserMessage = (userName, message) => {
    clients.filter(client => client.sessionData.userName === userName).forEach(client => client.send(JSON.stringify(message)));
};

const broadcast = message => {
    clients.forEach(client => client.send(JSON.stringify(message)));
};

module.exports = {
    handleClientConnect,
    handleClientMessage,
    handleClientDisconnect
};
