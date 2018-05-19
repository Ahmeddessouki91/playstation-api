const router = require('express').Router();
const { userRouter } = require('./users/userRouter');
const { timeRouter } = require('./times/timeRouter');
const { gameRouter } = require('./games/gameRouter');
const { categoryRouter } = require('./categories/categoryRouter');


router.use('/users', userRouter);
router.use('/times', timeRouter);
router.use('/games', gameRouter);
router.use('/categories', categoryRouter);


module.exports = router;
