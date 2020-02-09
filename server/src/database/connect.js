const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(process.env.DATABASE_URI, {
        user: process.env.DATABASE_USER,
        pass: process.env.DATABASE_PASSWORD,
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('database connected'))
        .catch(err => console.error(err));
};

module.exports = connect;
