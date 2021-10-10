const _ = require('lodash');
const createError = require('http-errors');
const { User } = require('./../models');

module.exports.getUsers = async (req, res, next) => {
  try {
    const foundUsers = await User.findAll({
      raw: true,
      attributes: {
        exclude: ['id', 'passwordHash', 'createdAt', 'updatedAt']
      },
      limit: 5
    });

    res.status(200).send({ data: foundUsers });
  } catch (e) {
    next(e);
  }
};

module.exports.getUserById = async (req, res) => {
  const {
    params: { userId }
  } = req;

  try {
    const [foundUser] = await User.findAll({
      raw: true,
      where: { id: userId },
      attributes: {
        exclude: ['id', 'passwordHash', 'createdAt', 'updatedAt']
      }
    });
    if (foundUser) {
      return res.status(200).send({ data: foundUser });
    }
    // res.status(404).send('User not found');
    next(createError(404, 'User not found'));
  } catch (e) {
    next(e);
  }
};

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    const createdUser = await User.create(body);

    const preparedUser = _.omit(createdUser.get(), [
      'id',
      'passwordHash',
      'createdAt',
      'updatedAt'
    ]);

    res.status(201).send({ data: preparedUser });
  } catch (e) {
    next(e);
  }
};

module.exports.updateUser = async (req, res, next) => {
  const {
    params: { userId },
    body
  } = req;

  try {
    //first method
    // const foundUser = await User.findByPk(userId);
    // if (foundUser) {
    //   const updatedUser = await foundUser.update(body);

    //   const preparedUser = _.omit(updatedUser.get(), [
    //     'id',
    //     'passwordHash',
    //     'createdAt',
    //     'updatedAt'
    //   ]);
    //   return res.status(200).send(preparedUser);
    // }
    // res.status(404).send('User Not Found');

    //second method
    const [updatedUserCount, [updatedUser]] = await User.update(body, {
      where: { id: userId },
      returning: true
    });

    if (updatedUserCount > 0) {
      const preparedUser = _.omit(updatedUser.get(), [
        'id',
        'createdAt',
        'updatedAt',
        'passwordHash'
      ]);
      return res.status(200).send({ data: preparedUser });
    }
    //res.status(404).send('User Not Found');
    next(createError(404, 'User Not Found'));
  } catch (e) {
    next(e);
  }
};

module.exports.updateOrCreateUser = async (req, res, next) => {
  const {
    params: { userId },
    body
  } = req;

  try {
    const [updatedUserCount] = await User.update(body, {
      where: { id: userId }
    });

    if (updatedUserCount > 0) {
      return res.status(204).send();
    }
    req.body.id = userId;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const {
    params: { userId }
  } = req;

  try {
    const deletedUsersCount = await User.destroy({ where: { id: userId } });

    if (deletedUsersCount > 0) {
      return res
        .status(200)
        .send(`Delete ${deletedUsersCount} users successfull`);
    }
    next(createError(404, 'User not found'));
  } catch (err) {
    next(err);
  }
};

module.exports.changeImage = async (req, res, next) => {
  const {
    params: { userId },
    file: { filename }
  } = req;

  try {
    console.log(`userId`, userId);
    const [updatedUserCount, [updatedUser]] = await User.update(
      { image: filename },
      {
        where: { id: userId },
        returning: true
      }
    );

    if (updatedUserCount > 0) {
      const preparedUser = _.omit(updatedUser.get(), [
        'id',
        'createdAt',
        'updatedAt',
        'passwordHash'
      ]);
      return res.status(200).send({ data: preparedUser });
    }

    next(createError(404, 'User Not Found'));
  } catch (e) {
    next(e);
  }
};

module.exports.getUserTasks = async (req, res) => {
  console.log(`getUserTasks from User.controller`);
};
