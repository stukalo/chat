const Message = require('./model');

const readUsersDialog = async ({ receiver, sender }) => {
    return Message.find({
        $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender }
        ]
    });
};

const readUserMessages = userName => {
    return Message.find({
        $or: [
            { sender: userName },
            { receiver: userName }
        ]
    });
};

const createMessage = ({ receiver, sender, content, date }) => {
    return new Message({
        receiver,
        sender,
        content,
        date
    }).save();
};

module.exports = {
    createMessage,
    readUsersDialog,
    readUserMessages
};
