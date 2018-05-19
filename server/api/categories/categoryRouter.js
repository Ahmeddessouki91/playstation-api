const categoryRouter = require('express').Router();
const categoryController = require('./categoryController');



categoryRouter.param('id', categoryController.findByParam);

categoryRouter.route('/')
    .get(categoryController.get)
    .post(categoryController.post)

categoryRouter.route('/:id')
    .get(categoryController.getOne)
    .put(categoryController.put)
    .delete(categoryController.delete);

module.exports = { categoryRouter };