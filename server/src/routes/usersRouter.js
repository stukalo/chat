const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
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

router.put('/', async (request, response) => {
    let status = OK;
    const data = {
        message: 'User updated'
    };
    const { userName } = request.sessionData;

    try {
        await usersService.updateUser({
            ...request.body,
            userName
        });
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
        const usersModels = await usersService.readAllUsers();
        const users = usersModels.map(user => ({
            email: user.email,
            userName: user.userName
        }));
        data = { users };
    } catch (err) {
        status = ERROR;
        data = { message: err.message };
    }

    response.json({ status, data });
});

router.post('/avatar', async (request, response) => {
    response.json({ status: ERROR, data: 'Sorry, feature is not available now' });
    // let status = OK;
    // let data;
    // const form = new formidable.IncomingForm();
    // const { userName } = request.sessionData;
    //
    // try {
    //     form.parse(request, (err, fields, files) => {
    //         const sourcePath = files.file.path;
    //         const extension = path.extname(files.file.name);
    //         const src = `/avatars/${userName}${extension}`;
    //         const targetPath = path.join(__dirname, `../../../public${src}`);
    //
    //         const readStream = fs.createReadStream(sourcePath);
    //         const writeStream = fs.createWriteStream(targetPath);
    //
    //         readStream.pipe(writeStream);
    //
    //         readStream.on('end', () => {
    //             fs.unlinkSync(sourcePath);
    //             data = { src };
    //
    //             response.json({ status, data });
    //         });
    //     });
    // } catch (error) {
    //     status = ERROR;
    //     data = { message: error.message };
    //
    //     response.json({ status, data });
    // }
});

module.exports = router;
