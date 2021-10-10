import { takeLatest } from '@redux-saga/core/effects';
import ACTION_TYPES from '../actions/actionTypes';
import { createUserSaga, getUsersSaga, deleteUserSaga } from './usersSaga';

function * rootSaga () {
  yield takeLatest(ACTION_TYPES.GET_USERS_ACTION, getUsersSaga);
  yield takeLatest(ACTION_TYPES.CREATE_USER_ACTION, createUserSaga);
  yield takeLatest(ACTION_TYPES.DELETE_USER_ACTION, deleteUserSaga);
}

export default rootSaga;
