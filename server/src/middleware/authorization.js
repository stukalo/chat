const jwt = require('jsonwebtoken');

const authorization = async (req, res, next) => {
    const token = req.header('Authorization');

    try {
        req.sessionData = await jwt.verify(token, process.env.SECRET);
        console.log(req.sessionData);
        next();
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' });
    }
};

module.exports = authorization;
