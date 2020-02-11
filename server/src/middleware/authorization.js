const getSessionData = require('../utils/getSessionData');

const authorization = async (req, res, next) => {
    const token = req.header('Authorization');
    const sessionData = getSessionData(token);

    if (!sessionData) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
        return;
    }

    req.sessionData = sessionData;
    next();
};

module.exports = authorization;
