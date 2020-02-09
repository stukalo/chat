const getSessionData = require('../utils/getSessionData');

const authorization = async (req, res, next) => {
    const sessionData = getSessionData(req);

    if (!sessionData) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }

    req.sessionData = sessionData;
    next();
};

module.exports = authorization;
