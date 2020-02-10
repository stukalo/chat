const messagesService = require('../messages');
const {
    USER_CONNECTED,
    USER_DISCONNECTED,
    CREATE_CHAT_MESSAGE,
    CREATE_CHAT_MESSAGE_FAILURE,
    CREATE_CHAT_MESSAGE_SUCCESS
} = require('../../constants/messageTypes');

const clients = [];

const handleCreateChatMessage = (ws, { payload }) => {
    const { userName: sender } = ws.sessionData;
    const { receiver, content } = payload;
    const date = Date.now();
    const chatMessage = {
        date,
        sender,
        content,
        receiver
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
    const { userName } = ws.sessionData;
    const message = {
        type: USER_CONNECTED,
        payload: { userName }
    };

    broadcast(message);
};

const handleClientDisconnect = ws => {
    const index = clients.indexOf(ws);

    if (index > -1) {
        clients.splice(index, 1);
    }

    const { userName } = ws.sessionData;
    const userSessions = clients.filter(client => client.sessionData.userName === userName);

    if (!userSessions.length) {
        const message = {
            type: USER_DISCONNECTED,
            payload: { userName }
        };

        broadcast(message);
    }
};

const sendUserMessage = (userName, message) => {
    clients.filter(client => client.sessionData.userName === userName).forEach(client => client.send(JSON.stringify(message)));
};

const broadcast = message => {
    clients.forEach(client => client.send(JSON.stringify(message)));
};

const getOnlineUsers = () => clients.map(client => client.sessionData.userName);

module.exports = {
    getOnlineUsers,
    handleClientConnect,
    handleClientMessage,
    handleClientDisconnect
};
