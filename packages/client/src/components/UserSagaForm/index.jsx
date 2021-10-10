import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { createUserAction } from './../../actions';

function UserSagaForm (props) {
  const { createUser } = props;

  const initialUserValues = {
    firstName: '',
    lastName: '',
    email: '',
    passwordHash: ''
  };

  const submitHandler = (values, formikBag) => {
    createUser(values);
    formikBag.resetForm();
  };

  return (
    <Formik initialValues={initialUserValues} onSubmit={submitHandler}>
      {formikProps => {
        return (
          <Form>
            <Field name='firstName' />
            <Field name='lastName' />
            <Field name='email' />
            <Field name='passwordHash' />
            <button type='submit'>Add</button>
          </Form>
        );
      }}
    </Formik>
  );
}

const mapDispatchToProps = dispatch => ({
  createUser: user => {
    dispatch(createUserAction(user));
  }
});

export default connect(null, mapDispatchToProps)(UserSagaForm);
