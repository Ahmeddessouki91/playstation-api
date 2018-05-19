const userRouter = require('express').Router();
const userController = require('./userController');

userRouter.route('/').get(userController.get)


module.exports = { userRouter };