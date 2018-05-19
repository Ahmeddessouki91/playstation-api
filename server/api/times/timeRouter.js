const timeRouter = require('express').Router();
const timeController = require('./timeController');

timeRouter.route('/').get(timeController.get)


module.exports = { timeRouter };