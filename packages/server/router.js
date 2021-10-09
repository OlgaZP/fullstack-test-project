const { Router } = require('express');
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');

const router = Router();

router.use('/users', userRouter);

router.use('/tasks', taskRouter);

module.exports = router;
