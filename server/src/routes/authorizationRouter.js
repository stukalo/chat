const express = require('express');
const router = express.Router();
const usersService = require('../services/users');
const createToken = require('../utils/createToken');
const bcrypt = require('bcrypt');
const { OK, ERROR } = require('../constants/responseStatus');

router.post('/', async (request, response) => {
    let data = null;
    let status = OK;
    const { userName, password } = request.body;

    try {
        const user = await usersService.readUserByUserName(userName);

        if (!user) {
            throw new Error('User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        data = { token: createToken(user, process.env.SECRET, '1hr') };
    } catch (err) {
        status = ERROR;
        data = { message: err.message };
    }

    response.json({
        status,
        data
    });
});

module.exports = router;
