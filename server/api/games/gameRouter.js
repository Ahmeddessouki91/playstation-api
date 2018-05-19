const gameRouter = require('express').Router();
const gameController = require('./gameController');


gameRouter.param('id', gameController.findByParam);

gameRouter.route('/')
    .get(gameController.get)
    .post(gameController.post)

gameRouter.route('/:id')
    .get(gameController.getOne)
    .put(gameController.put)
    .delete(gameController.delete);


module.exports = { gameRouter };
