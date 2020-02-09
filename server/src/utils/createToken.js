const jwt = require('jsonwebtoken');

const createToken = ({ userName, email }, secret, expiresIn) => {
    return jwt.sign(
        { userName, email },
        secret,
        { expiresIn }
    );
};

module.exports = createToken;
