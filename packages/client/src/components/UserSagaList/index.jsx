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

  const mapUser = ({ firstName, lastName, email }) => {
    // const changeBann = () => {
    //   updateUserAction({ id: id, isBanned: !isBanned })
    // }

    const deleteHandler = () => {
      deleteUser(email);
    };

    return (
      <li key={email}>
        firstNAme: {firstName} lastName: {lastName} email: {email}
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
