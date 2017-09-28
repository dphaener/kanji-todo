import React from 'react';
import { graphql } from 'react-apollo';
import { compose, withState, withHandlers } from 'recompose';
import { Button, Card, Form, FormField, FormInput } from 'elemental';

import { usersQuery, createUserMutation } from './queries';

const NewUser = ({
  email,
  name,
  handleNameChanged,
  handleEmailChanged,
  handleCreateUser,
  history
}) =>
  <Card>
    <h1>Create User</h1>
    <Form>
      <FormField label="Email Address" htmlFor="email">
        <FormInput
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={handleEmailChanged}
        />
      </FormField>
      <FormField label="Name" htmlFor="name">
        <FormInput
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleNameChanged}
        />
      </FormField>
      <Button type="primary" onClick={handleCreateUser}>Save</Button>&nbsp;
      <Button type="danger" onClick={() => history.push('/')}>Cancel</Button>
    </Form>
  </Card>

const userCreator = ({ name, email, createUser, history }) => () => {
  createUser({ name, email }).then(() => history.push('/'));
}

export default compose(
  graphql(createUserMutation, {
    props: ({ ownProps, mutate }) => ({
      createUser: ({ email, name }) => mutate({
        variables: { email, name },
        update: (store, { data: { createUser } }) => {
          const data = store.readQuery({ query: usersQuery });
          data.users.push(createUser);
          store.writeQuery({ query: usersQuery, data });
        }
      })
    })
  }),
  withState('name', 'updateName', ''),
  withState('email', 'updateEmail', ''),
  withHandlers({
    handleNameChanged: ({ updateName }) => ev => updateName(ev.target.value),
    handleEmailChanged: ({ updateEmail }) => ev => updateEmail(ev.target.value),
    handleCreateUser: userCreator
  })
)(NewUser);
