const config = require('./server/config/config');
const { app } = require('./server/server');
const http = require('http');

const server = http.createServer(app);
server.listen(config.port, () => console.log(`Server is started on port ${config.port}`));