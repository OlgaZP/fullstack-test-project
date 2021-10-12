import { put } from 'redux-saga/effects';
import {
  getUsersError,
  getUsersRequest,
  getUsersSuccess,
  createUserError,
  createUserRequest,
  createUserSuccess,
  deleteUserRequest,
  deleteUserError,
  deleteUserSuccess
} from '../actions';
import * as API from './../api';

export function * getUsersSaga () {
  yield put(getUsersRequest()); // отправка экшна
  try {
    const {
      data: { data: users }
    } = yield API.getUsers();
    yield put(getUsersSuccess(users));
  } catch (e) {
    yield put(getUsersError(e));
  }
}

export function * createUserSaga (action) {
  const { user } = action;

  yield put(createUserRequest());
  try {
    const {
      data: { data: newUser }
    } = yield API.createUser(user);
    yield put(createUserSuccess(newUser));
  } catch (e) {
    yield put(createUserError(e));
  }
}

export function * deleteUserSaga (action) {
  const { id } = action;
  yield put(deleteUserRequest());
  try {
    // const { data: deletedUser } = yield API.deleteUser(id);
    // yield put(deleteUserSuccess(deletedUser));
    yield API.deleteUser(id);
    yield put(deleteUserSuccess(id));
  } catch (e) {
    yield put(deleteUserError(e));
  }
}
