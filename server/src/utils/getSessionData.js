const jwt = require('jsonwebtoken');

const getSessionData = token => {
    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (e) {
        return null;
    }
};

module.exports = getSessionData;
