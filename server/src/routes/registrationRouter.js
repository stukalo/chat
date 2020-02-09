const express = require('express');
const router = express.Router();
const usersService = require('../services/users');
const createToken = require('../utils/createToken');
const { OK, ERROR } = require('../constants/responseStatus');

router.post('/', async (request, response) => {
    let status = OK;
    let data = null;

    try {
        const user = await usersService.createUser(request.body);
        data = { token: createToken(user, process.env.SECRET, '1hr') };
    } catch (err) {
        status = ERROR;
        data = { message: err.message };
    }

    response.json({ status, data });
});

module.exports = router;
