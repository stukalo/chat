const User = require('./model');

const createUser = async ({ userName, email, password }) => {
    const user = await User.findOne({ userName });

    if (user) {
        throw new Error('User already exists');
    }

    return new User({
        email,
        password,
        userName
    }).save();
};

const updateUser = async ({ userName, email, password }) => {
    const user = await User.findOne({ userName });

    if (!user) {
        throw new Error('User not found');
    }

    user.email = email;
    user.password = password;

    user.save();
};

const readUserByUserName = async userName => {
    return User.findOne({ userName });
};

const readAllUsers = async () => {
    return User.find();
};

module.exports = {
    createUser,
    updateUser,
    readAllUsers,
    readUserByUserName
};
