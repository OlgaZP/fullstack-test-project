const { Router } = require('express');
const { taskController } = require('../controllers');

const taskRouter = Router();

taskRouter.get('/', taskController.getTasks);

module.exports = taskRouter;
