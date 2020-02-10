const Message = require('./model');

const createMessage = ({ receiver, sender, content, date }) => {
    return new Message({
        receiver,
        sender,
        content,
        date
    }).save();
};

module.exports = {
    createMessage
};
