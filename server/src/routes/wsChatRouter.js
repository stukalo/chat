const chatService = require('../services/chat');

const connectionHandler = ws => {
    chatService.handleClientConnect(ws);
};

const webSocketHandler = ws => {
    ws.on('message', message => chatService.handleClientMessage(ws, JSON.parse(message)));
    ws.on('close', () => chatService.handleClientDisconnect(ws));
};

module.exports = {
    webSocketHandler,
    connectionHandler
};
