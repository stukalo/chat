/**
 * Module dependencies
 */

const app = require('./src/app');
const http = require('http');

/**
 * Get port from environment and store in Express
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false
 */
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // Named pipe
        return val;
    }

    if (port >= 0) {
        // Port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event
 */
function onError(error) {
    throw error;
}

/**
 * Event listener for HTTP server "listening" event
 */
function onListening() {
    const addr = server.address();
    const uri = typeof addr === 'string' ? addr : `http://localhost:${addr.port}`;
    console.log(`Listening on ${uri}`);
}
