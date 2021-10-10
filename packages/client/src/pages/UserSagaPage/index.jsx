import React from 'react';
import UserSagaForm from '../../components/UserSagaForm';
import UserSagaList from '../../components/UserSagaList';

export default function UserSagaPage () {
  return (
    <>
      <UserSagaForm />
      <hr />
      <UserSagaList />
    </>
  );
}
