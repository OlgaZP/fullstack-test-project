const { Router } = require('express');
const { userController } = require('../controllers');

const userRouter = Router();

// route begin from /api/users
userRouter
  .route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

//refactoring... use userRouter.rout instead 4 different strings
userRouter
  .route('/:userId')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .put(userController.updateOrCreateUser, userController.createUser)
  .delete(userController.deleteUser);
// userRouter.get('/:userId', userController.getUserById);
// userRouter.patch('/:userId', userController.updateUser);
// userRouter.put('/:userId', userController.updateUser);
// userRouter.delete('/:userId', userController.deleteUser);

userRouter.get('/:userId/tasks', userController.getUserTasks);

module.exports = userRouter;
