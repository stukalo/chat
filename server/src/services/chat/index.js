const clients = [];

const handleConnect = connect => {
    clients.push(connect);
    console.log(`connected ${clients.length}`);
};

const handleWebSocket = ws => {
    ws.on('message', msg => {
        console.log(msg);
    });

    ws.on('close', () => {
        const index = clients.indexOf(ws);

        if (index > -1) {
            clients.splice(index, 1);
        }

        console.log(`ws closed index=${index}`);
    });

    console.log('chatService handleWebSocket');
};

module.exports = {
    handleConnect,
    handleWebSocket
};
