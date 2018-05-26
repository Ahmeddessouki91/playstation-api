const timeRouter = require('express').Router();
const timeController = require('./timeController');

timeRouter.param('id', timeController.findByParam);

timeRouter.route('/')
    .get(timeController.get)
    .post(timeController.post)

timeRouter.route('/:id')
    .get(timeController.getOne)
    .put(timeController.put)
    .delete(timeController.delete);

module.exports = { timeRouter };

