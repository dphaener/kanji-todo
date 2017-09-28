import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo'
import { Col, Button } from 'elemental';

import UserListItem from './list_item';
import { usersQuery } from './queries';

const UserList = ({ data, history }) =>
  <div>
    <div className="user-list-holder">
      <h1>Users</h1>
      { data.users &&
        data.users.map(user =>
          <Col sm="2/3" key={user.id}>
            <UserListItem user={user} refresh={() => data.refetch()} />
          </Col>
        )
      }
      <Button type="primary" onClick={() => history.push('/users/new')}>
        + New User
      </Button>
    </div>
  </div>

export default graphql(usersQuery)(UserList);
