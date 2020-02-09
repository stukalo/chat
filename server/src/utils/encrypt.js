const bcrypt = require('bcrypt');

const encrypt = async data => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(data, salt);
};

module.exports = encrypt;
