const router = require('express').Router();

router.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
        console.log('here!!!!!!!!!!!!!!', msg);
        ws.send(msg);
    });
});

module.exports = router;
