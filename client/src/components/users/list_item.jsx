import React from 'react';
import { Card, Glyph } from 'elemental';
import { graphql } from 'react-apollo';
import { compose, withHandlers } from 'recompose';

import { usersQuery, destroyUserMutation } from './queries';

const UserListItem = ({
  user,
  refresh,
  handleDestroyUser
}) =>
  <Card>
    <span><strong>Email: </strong>{user.email}</span>&nbsp;&ndash;&nbsp;
    <span><strong>Name: </strong>{user.name}</span>
    <span onClick={handleDestroyUser} className="delete-button">
      <Glyph icon="x" type="danger" />
    </span>
  </Card>

export default compose(
  graphql(destroyUserMutation, {
    props: ({ ownProps, mutate }) => ({
      destroyUser: (id) => mutate({
        variables: { id },
        update: (store, { data: { destroyUser: { id } } }) => {
          const data = store.readQuery({ query: usersQuery });
          data.users = data.users.filter(user => user.id !== id);
          store.writeQuery({ query: usersQuery, data });
        }
      }),
    })
  }),
  withHandlers({
    handleDestroyUser: ({ destroyUser, user }) => () => destroyUser(user.id)
  })
)(UserListItem);
