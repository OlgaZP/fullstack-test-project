const { Router } = require('express');
const { userController } = require('../controllers');
const { upload, paginate } = require('../middleware');

const userRouter = Router();

// route begin from /api/users
userRouter
  .route('/')
  .get(paginate.paginateUsers, userController.getUsers)
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

//add middleware upload
//path /api/users/:userId/images
userRouter.patch(
  '/:userId/images',
  upload.uploadUserPhoto.single('userPhoto'),
  userController.changeImage
);

userRouter.get('/:userId/tasks', userController.getUserTasks);

module.exports = userRouter;
