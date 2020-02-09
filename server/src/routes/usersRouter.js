const express = require('express');
const router = express.Router();
const usersService = require('../services/users');
const { OK, ERROR } = require('../constants/responseStatus');
const authorization = require('../middleware/authorization');

router.use(authorization);

router.post('/', async (request, response) => {
    let status = OK;
    const data = {
        message: 'User created'
    };

    try {
        await usersService.createUser(request.body);
    } catch (err) {
        status = ERROR;
        data.message = err.message;
    }

    response.json({ status, data });
});

router.get('/', async (request, response) => {
    let status = OK;
    let data = null;

    try {
        const users = await usersService.readAllUsers();
        data = { users };
    } catch (err) {
        status = ERROR;
        data = { message: err.message };
    }

    response.json({ status, data });
});

module.exports = router;
