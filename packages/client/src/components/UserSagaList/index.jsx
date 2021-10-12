import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './../../actions';
import ACTION_TYPES from '../../actions/actionTypes';

// Получить состояние из глобального состояния
function UsersSagaList (props) {
  const { users, isFetching, error, getUsers, deleteUser } = props;

  useEffect(() => {
    getUsers();
  }, [users.length]);

  const mapUser = ({ id, firstName, lastName, email }) => {
    const deleteHandler = () => {
      deleteUser(id);
    };

    return (
      <li key={id}>
        firstName: {firstName} lastName: {lastName} email: {email}
        <button onClick={deleteHandler}>Delete</button>
      </li>
    );
  };

  return (
    <>
      {isFetching && <div>Loading...</div>}
      {error && <div>ERROR</div>}
      <ul>{users.map(mapUser)}</ul>
    </>
  );
}

const mapStateToProps = state => state.sagaUsers;

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(actionCreators.getUsersAction()),
  deleteUser: id => dispatch(actionCreators.deleteUserAction(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersSagaList);
