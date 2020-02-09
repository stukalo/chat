const jwt = require('jsonwebtoken');

const getSessionData = req => {
    const token = req.header('Authorization');

    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (e) {
        return null;
    }
};

module.exports = getSessionData;
