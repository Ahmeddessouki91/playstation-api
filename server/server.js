const express = require('express');
const app = express();
const setupMiddlware = require('./middleware/appMiddleware');
const api = require('./api/restRouter');
var { initDB, mongoose } = require('./db/mongoose');
const { protect, signIn, register } = require('./api/auth/auth');


initDB();
setupMiddlware(app, express);
app.use('/api', protect, api)
app.use('/token', signIn);
app.use('/register', register);



//error handling
app.use((err, req, res, next) => {
    if (err) {
        console.log(err.message);
        res.status(500).send(err);
    }
});









exports.app = app;



