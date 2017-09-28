import React from 'react';
import { Route } from 'react-router-dom';

import UserList from './components/users/list';
import NewUser from './components/users/new';

const App = () =>
  <div className="app">
    <Route exact={true} path="/" component={UserList} />
    <Route path="/users/new" component={NewUser} />
  </div>

export default App;
